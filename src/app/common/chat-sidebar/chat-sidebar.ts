import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat/chat.service';
import { ConversationMessage } from '../../types/Chat/ConversationMessage';
import { ChatMessageRequest } from '../../types/Chat/ChatMessageRequest';
import { ProductFilterResponse } from '../../types/Product/ProductFilterResponse';

type ChatMessage = ConversationMessage & {
  products?: ProductFilterResponse[];
};

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chat-sidebar.html',
  styleUrls: ['./chat-sidebar.css']
})
export class ChatSidebar implements OnInit, AfterViewChecked {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  conversationId?: string;
  private shouldScrollToBottom: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = [
      {
        role: 'assistant',
        content: 'Olá! Sou seu assistente virtual. Como posso ajudá-lo hoje? Posso responder suas dúvidas e recomendar produtos!'
      }
    ];
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  closeSidebar(): void {
    this.close.emit();
  }

  sendMessage(): void {
    const message = this.userInput.trim();
    if (!message || this.isLoading) return;

    this.messages.push({
      role: 'user',
      content: message
    });

    this.userInput = '';
    this.isLoading = true;
    this.shouldScrollToBottom = true;

    const conversationHistory: ConversationMessage[] = this.messages
      .slice(0, -1)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    const request: ChatMessageRequest = {
      message,
      conversationId: this.conversationId,
      conversationHistory: conversationHistory.length > 0 ? conversationHistory : undefined
    };

    this.chatService.sendMessage(request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.conversationId = response.data.conversationId;

          this.messages.push({
            role: 'assistant',
            content: response.data.message,
            products: response.data.products
          });

          this.shouldScrollToBottom = true;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.messages.push({
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
        });
        this.isLoading = false;
        this.shouldScrollToBottom = true;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Erro ao fazer scroll:', err);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}
