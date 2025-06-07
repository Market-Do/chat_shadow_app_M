import { Chat, Message, User } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'alice',
    status: 'Online',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    id: 'user2',
    username: 'bob',
    status: 'Last seen 2h ago',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 'user3',
    username: 'charlie',
    status: 'Online',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: 'user4',
    username: 'dave',
    status: 'Last seen yesterday',
  },
  {
    id: 'user5',
    username: 'eve',
    status: 'Online',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
];

// Mock chats data
export const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Alice',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    participants: ['current-user', 'user1'],
    lastMessage: 'Hey there! How are you?',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 1,
    isGroup: false,
    isEncrypted: true,
    lastMessageSent: false,
    lastMessageRead: false,
  },
  {
    id: '2',
    name: 'Security Team',
    participants: ['current-user', 'user1', 'user2', 'user3'],
    lastMessage: 'Meeting at 3pm tomorrow',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    unreadCount: 0,
    isGroup: true,
    isEncrypted: true,
    lastMessageSent: true,
    lastMessageRead: true,
  },
  {
    id: '3',
    name: 'Bob',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    participants: ['current-user', 'user2'],
    lastMessage: 'Check out this article',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    unreadCount: 0,
    isGroup: false,
    isEncrypted: true,
    lastMessageSent: true,
    lastMessageRead: false,
  },
];

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: 'm1',
    chatId: '1',
    senderId: 'user1',
    content: 'Hey there! How are you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    read: false,
    encrypted: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(), // Expires in 20 hours
  },
  {
    id: 'm2',
    chatId: '1',
    senderId: 'current-user',
    content: 'I\'m good, thanks! How about you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
    read: true,
    encrypted: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString(), // Expires in 22 hours
  },
  {
    id: 'm3',
    chatId: '1',
    senderId: 'user1',
    content: 'Doing well! Working on that project we discussed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    read: false,
    encrypted: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 23).toISOString(), // Expires in 23 hours
  },
  {
    id: 'm4',
    chatId: '1',
    senderId: 'current-user',
    content: 'Great! Let me know if you need any help with it.',
    timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minute ago
    read: false,
    encrypted: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Expires in 24 hours
  },
];