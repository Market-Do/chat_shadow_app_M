import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.profileSection, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.profileContent}
          onPress={() => router.push('/settings/profile')}
        >
          <Avatar 
            name={user?.username || 'User'} 
            size={64} 
            imageUrl={user?.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.username, { color: colors.text }]}>
              {user?.username || 'Username'}
            </Text>
            <Text style={[styles.status, { color: colors.textSecondary }]}>
              Online
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.section, { marginTop: 24 }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Preferences</Text>
        
        <View style={[styles.optionsList, { backgroundColor: colors.card }]}>
          <TouchableOpacity 
            style={[styles.option, { borderBottomColor: colors.border }]}
            onPress={() => router.push('/settings/theme')}
          >
            <Feather name="sliders" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Appearance</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={[styles.option, { borderBottomWidth: 0 }]}>
            <Feather name="moon" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={theme === 'dark' ? colors.primary : colors.card}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>App</Text>
        
        <View style={[styles.optionsList, { backgroundColor: colors.card }]}>
          <TouchableOpacity 
            style={[styles.option, { borderBottomColor: colors.border }]}
            onPress={() => router.push('/settings/security')}
          >
            <Feather name="lock" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Security</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.option, { borderBottomColor: colors.border }]}
          >
            <Feather name="bell" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Notifications</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.option, { borderBottomWidth: 0 }]}
            onPress={() => router.push('/settings/web-login')}
          >
            <Feather name="grid" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Web Login</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support</Text>
        
        <View style={[styles.optionsList, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={[styles.option, { borderBottomColor: colors.border }]}>
            <Feather name="help-circle" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Help</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]}>
            <Feather name="info" size={20} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>About</Text>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.error }]} // Mantido como estava, pois LogOut já é do Feather
        onPress={signOut}
      >
        <Feather name="log-out" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          ChatShadow v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  status: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 8,
  },
  optionsList: {
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    height: 56,
    borderRadius: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});