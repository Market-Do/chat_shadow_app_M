import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsLayout() {
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
          title: 'Settings',
          headerShadowVisible: false 
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Edit Profile',
        }} 
      />
      <Stack.Screen 
        name="theme" 
        options={{ 
          title: 'Appearance',
        }} 
      />
      <Stack.Screen 
        name="security" 
        options={{ 
          title: 'Security',
        }} 
      />
      <Stack.Screen 
        name="web-login" 
        options={{ 
          title: 'Web Login',
        }} 
      />
    </Stack>
  );
}