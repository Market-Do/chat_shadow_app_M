import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { formatMessageTime } from '@/utils/formatters';
import { Message } from '@/types';
import { Lock, Clock } from 'react-native-vector-icons';
import { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const { colors } = useTheme();
  const [isDecrypted, setIsDecrypted] = useState(!message.encrypted);
  const [content, setContent] = useState(message.content);
  const { decrypt } = useEncryption();
  
  // Format timestamp
  const formattedTime = formatMessageTime(new Date(message.timestamp));
  
  // Calculate remaining time until expiry
  const expiryDate = new Date(message.expiresAt);
  const now = new Date();
  const remainingHours = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
  
  const handleDecrypt = async () => {
    if (!message.encrypted || isDecrypted) return;
    
    try {
      const decryptedContent = await decrypt(message.content);
      setContent(decryptedContent);
      setIsDecrypted(true);
    } catch (error) {
      console.error('Failed to decrypt message:', error);
    }
  };
  
  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUser : styles.otherUser
    ]}>
      <View style={[
        styles.bubble,
        isCurrentUser 
          ? [styles.currentUserBubble, { backgroundColor: colors.primary }]
          : [styles.otherUserBubble, { backgroundColor: colors.card, borderColor: colors.border }]
      ]}>
        {message.encrypted && !isDecrypted ? (
          <TouchableOpacity style={styles.encryptedContent} onPress={handleDecrypt}>
            <Lock size={16} color={isCurrentUser ? 'white' : colors.primary} />
            <Text style={[
              styles.encryptedText,
              { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary }
            ]}>
              Encrypted message. Tap to decrypt.
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? 'white' : colors.text }
          ]}>
            {content}
          </Text>
        )}
        
        <View style={styles.footer}>
          <Text style={[
            styles.timestamp,
            { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary }
          ]}>
            {formattedTime}
          </Text>
          
          {remainingHours < 24 && (
            <View style={styles.expiryContainer}>
              <Clock 
                size={12} 
                color={isCurrentUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary} 
              />
              <Text style={[
                styles.expiryText,
                { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary }
              ]}>
                {remainingHours}h
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    maxWidth: '80%',
  },
  currentUser: {
    alignSelf: 'flex-end',
  },
  otherUser: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    padding: 12,
    minWidth: 80,
  },
  currentUserBubble: {
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  expiryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 2,
  },
  encryptedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  encryptedText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontStyle: 'italic',
    marginLeft: 4,
  },
});