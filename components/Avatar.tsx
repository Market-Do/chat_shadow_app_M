import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface AvatarProps {
  name: string;
  size: number;
  imageUrl?: string;
}

export function Avatar({ name, size, imageUrl }: AvatarProps) {
  const { colors } = useTheme();
  
  // Generate a color based on the name
  const getInitialsColor = (name: string) => {
    const colors = [
      '#6D28D9', // purple
      '#0D9488', // teal
      '#9333EA', // violet
      '#06B6D4', // cyan
      '#F59E0B', // amber
      '#10B981', // emerald
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  // Get initials from name
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };
  
  const initials = getInitials(name);
  const backgroundColor = getInitialsColor(name);
  
  const fontSize = size * 0.4;
  
  return (
    <View>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              {
                fontSize,
              },
            ]}
          >
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#e1e1e1',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});