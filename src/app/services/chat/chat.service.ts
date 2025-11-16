import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../types/Api/ApiResponse';
import { ChatMessageRequest } from '../../types/Chat/ChatMessageRequest';
import { ChatMessageResponse } from '../../types/Chat/ChatMessageResponse';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  sendMessage(request: ChatMessageRequest): Observable<ApiResponse<ChatMessageResponse>> {
    return this.http.post<ApiResponse<ChatMessageResponse>>(
      `${this.baseUrl}api/chat/message`,
      request
    );
  }
}
