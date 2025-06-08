import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { ChatPreview } from '@/components/ChatPreview';
import { mockChats } from '@/utils/mockData';

export default function ChatsScreen() {
  const { colors } = useTheme();
  const [chats, setChats] = useState(mockChats);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={[styles.searchBar, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
          onPress={() => {/* Open search modal */}}
        >
          <Feather name="search" size={20} color={colors.textSecondary} />
          <Text style={[styles.searchText, { color: colors.textSecondary }]}>Search chats</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatPreview 
            chat={item}
            onPress={() => router.push(`/chats/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No chats yet</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Start a new chat by tapping the button below
            </Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={[styles.newChatButton, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/chats/new-chat')}
      >
        <Feather name="message-square" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 80,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});