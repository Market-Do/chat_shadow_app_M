import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function ContactsLayout() {
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
          title: 'Contacts',
          headerShadowVisible: false 
        }} 
      />
    </Stack>
  );
}