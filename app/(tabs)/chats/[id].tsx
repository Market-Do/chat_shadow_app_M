import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { MessageBubble } from '@/components/MessageBubble';
import { Send, Image as ImageIcon, Mic, Smile } from 'lucide-react-native';
import { mockMessages, mockChats } from '@/utils/mockData';
import { Message, Chat } from '@/types';
import { useEncryption } from '@/hooks/useEncryption';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [inputText, setInputText] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const { encrypt } = useEncryption();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // In a real app, we would fetch messages from API/database
    if (id) {
      setChat(mockChats.find(chat => chat.id === id) || null);
      setMessages(mockMessages.filter(msg => msg.chatId === id));
    }
  }, [id]);

  const sendMessage = async () => {
    if (!inputText.trim() || !id) return;
    
    try {
      // In a real app, we would encrypt and send to API
      const encryptedContent = isEncrypted 
        ? await encrypt(inputText)
        : inputText;
      
      const newMessage: Message = {
        id: Date.now().toString(),
        chatId: id,
        senderId: 'current-user', // In a real app, this would be the current user's ID
        content: encryptedContent,
        timestamp: new Date().toISOString(),
        read: false,
        encrypted: isEncrypted,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Scroll to the bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!chat) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageBubble 
              message={item}
              isCurrentUser={item.senderId === 'current-user'}
            />
          )}
          contentContainerStyle={styles.messagesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No messages yet. Start the conversation!
              </Text>
            </View>
          }
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
        />
        
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.attachButton}>
              <ImageIcon size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            
            <TouchableOpacity style={styles.emojiButton}>
              <Smile size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            
            {!inputText ? (
              <TouchableOpacity style={styles.micButton}>
                <Mic size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.sendButton, { backgroundColor: colors.primary }]}
                onPress={sendMessage}
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    padding: 8,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  emojiButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});