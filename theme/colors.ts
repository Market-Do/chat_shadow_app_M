// Define color types
export interface Colors {
  primary: string;
  primaryLight: string;
  accent: string;
  accentLight: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  notification: string;
  error: string;
  errorLight: string;
  warning: string;
  warningLight: string;
  success: string;
  successLight: string;
  inputBackground: string;
}

// Light theme colors
export const lightColors: Colors = {
  primary: '#6D28D9',       // Purple 700
  primaryLight: '#DDD6FE',  // Purple 200
  accent: '#0D9488',        // Teal 600
  accentLight: '#CCFBF1',   // Teal 100
  background: '#F9FAFB',    // Gray 50
  card: '#FFFFFF',          // White
  text: '#1F2937',          // Gray 800
  textSecondary: '#6B7280', // Gray 500
  border: '#E5E7EB',        // Gray 200
  notification: '#EF4444',  // Red 500
  error: '#EF4444',         // Red 500
  errorLight: '#FEE2E2',    // Red 100
  warning: '#F59E0B',       // Amber 500
  warningLight: '#FEF3C7',  // Amber 100
  success: '#10B981',       // Emerald 500
  successLight: '#D1FAE5',  // Emerald 100
  inputBackground: '#F3F4F6', // Gray 100
};

// Dark theme colors
export const darkColors: Colors = {
  primary: '#8B5CF6',       // Purple 500
  primaryLight: '#4C1D95',  // Purple 900
  accent: '#14B8A6',        // Teal 500
  accentLight: '#134E4A',   // Teal 900
  background: '#111827',    // Gray 900
  card: '#1F2937',          // Gray 800
  text: '#F9FAFB',          // Gray 50
  textSecondary: '#9CA3AF', // Gray 400
  border: '#374151',        // Gray 700
  notification: '#EF4444',  // Red 500
  error: '#EF4444',         // Red 500
  errorLight: '#7F1D1D',    // Red 900
  warning: '#F59E0B',       // Amber 500
  warningLight: '#78350F',  // Amber 900
  success: '#10B981',       // Emerald 500
  successLight: '#064E3B',  // Emerald 900
  inputBackground: '#374151', // Gray 700
};