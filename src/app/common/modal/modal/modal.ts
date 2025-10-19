import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';

type ButtonSeverity = 'secondary' | 'success' | 'info' | 'danger' | 'help' | 'contrast' | 'primary';

export interface DialogButton {
  label: string;
  icon?: string;
  severity?: ButtonSeverity;
  action?: () => void;
  closeOnClick?: boolean; // Nova propriedade
}

export interface DialogParams {
  header: string;
  iconClass: string;
  iconColor: string;
  title: string;
  message: string;
  buttons: DialogButton[];
  closable?: boolean;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Dialog,
    PrimeTemplate
  ],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class Modal {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() header: string = '';
  @Input() iconClass: string = 'pi pi-info-circle';
  @Input() iconColor: string = '#6366f1';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() buttons: DialogButton[] = [];
  @Input() closable: boolean = false;

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  executeAction(button: DialogButton): void {
    if (button.action) {
      button.action();
    }

    if (button.closeOnClick !== false) {
      this.closeDialog();
    }
  }

  onHide(): void {
    this.closeDialog();
  }

  trackByLabel(index: number, button: DialogButton): string {
    return button.label;
  }
}
