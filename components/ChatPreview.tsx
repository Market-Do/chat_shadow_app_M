import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from './Avatar';
import { formatTime } from '@/utils/formatters';
import { Chat } from '@/types';
import { Check, CheckCheck, Lock } from 'lucide-react-native';

interface ChatPreviewProps {
  chat: Chat;
  onPress: () => void;
}

export function ChatPreview({ chat, onPress }: ChatPreviewProps) {
  const { colors } = useTheme();
  
  // Format timestamp
  const formattedTime = formatTime(new Date(chat.lastMessageTime));
  
  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <Avatar
        name={chat.name}
        size={56}
        imageUrl={chat.avatar}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text 
            style={[styles.name, { color: colors.text }]}
            numberOfLines={1}
          >
            {chat.name}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {formattedTime}
          </Text>
        </View>
        
        <View style={styles.messageRow}>
          <View style={styles.messageContent}>
            {chat.isEncrypted && (
              <Lock size={14} color={colors.primary} style={styles.lockIcon} />
            )}
            <Text 
              style={[
                styles.message, 
                { color: chat.unreadCount > 0 ? colors.text : colors.textSecondary }
              ]}
              numberOfLines={1}
            >
              {chat.lastMessage}
            </Text>
          </View>
          
          <View style={styles.indicators}>
            {chat.unreadCount > 0 ? (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>
                  {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                </Text>
              </View>
            ) : chat.lastMessageSent ? (
              chat.lastMessageRead ? (
                <CheckCheck size={16} color={colors.success} />
              ) : (
                <Check size={16} color={colors.textSecondary} />
              )
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  lockIcon: {
    marginRight: 4,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    flex: 1,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: 'white',
  },
});