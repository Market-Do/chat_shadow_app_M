import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function ChatsLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
          color: colors.text,
        },
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Chats',
          headerShadowVisible: false 
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: '',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="new-chat" 
        options={{ 
          title: 'New Chat',
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}