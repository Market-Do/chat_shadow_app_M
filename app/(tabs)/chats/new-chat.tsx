import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { User } from '@/types';
import { mockUsers } from '@/utils/mockData';
import { Search, X, Check } from 'lucide-react-native';
import { Avatar } from '@/components/Avatar';

export default function NewChatScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleUserSelection = (user: User) => {
    if (selectedUsers.some(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  
  const createChat = () => {
    if (selectedUsers.length === 0) return;
    
    // In a real app, we would create a chat via API
    // For now, we'll navigate to an existing chat as demo
    router.push('/chats/1');
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput 
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search users..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {selectedUsers.length > 0 && (
        <View style={[styles.selectedContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <Text style={[styles.selectedTitle, { color: colors.text }]}>Selected ({selectedUsers.length})</Text>
          <FlatList
            data={selectedUsers}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.selectedUser}
                onPress={() => toggleUserSelection(item)}
              >
                <Avatar 
                  name={item.username} 
                  size={40} 
                  imageUrl={item.avatar} 
                />
                <Text style={[styles.selectedUsername, { color: colors.text }]}>{item.username}</Text>
                <View style={[styles.removeButton, { backgroundColor: colors.error }]}>
                  <X size={12} color="white" />
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.selectedList}
          />
        </View>
      )}
      
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.userItem, { borderBottomColor: colors.border }]}
            onPress={() => toggleUserSelection(item)}
          >
            <Avatar 
              name={item.username} 
              size={48} 
              imageUrl={item.avatar} 
            />
            <View style={styles.userInfo}>
              <Text style={[styles.username, { color: colors.text }]}>{item.username}</Text>
              <Text style={[styles.status, { color: colors.textSecondary }]}>
                {item.status}
              </Text>
            </View>
            <View style={[
              styles.checkbox, 
              selectedUsers.some(u => u.id === item.id) 
                ? { backgroundColor: colors.primary, borderColor: colors.primary } 
                : { borderColor: colors.border }
            ]}>
              {selectedUsers.some(u => u.id === item.id) && (
                <Check size={16} color="white" />
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No users found
            </Text>
          </View>
        }
      />
      
      {selectedUsers.length > 0 && (
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={createChat}
        >
          <Text style={styles.createButtonText}>
            {selectedUsers.length === 1 ? 'Start Chat' : 'Create Group Chat'}
          </Text>
        </TouchableOpacity>
      )}
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
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  selectedContainer: {
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  selectedTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 8,
  },
  selectedList: {
    paddingHorizontal: 16,
  },
  selectedUser: {
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  selectedUsername: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
  },
  removeButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  username: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  status: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  createButton: {
    margin: 16,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
});