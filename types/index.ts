// User type
export interface User {
  id: string;
  username: string;
  avatar?: string;
  status?: string;
}

// Chat type
export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  lastMessageSent?: boolean;
  lastMessageRead?: boolean;
  unreadCount: number;
  isGroup: boolean;
  isEncrypted: boolean;
}

// Message type
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  encrypted: boolean;
  expiresAt: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
}