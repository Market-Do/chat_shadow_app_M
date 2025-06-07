import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { QrCode, RefreshCcw } from 'lucide-react-native';
import * as Crypto from 'expo-crypto';

export default function WebLoginScreen() {
  const { colors } = useTheme();
  const [qrValue, setQrValue] = useState('');
  const [expiryTime, setExpiryTime] = useState(120); // 2 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    generateQrCode();
  }, []);

  useEffect(() => {
    if (expiryTime > 0 && !isExpired) {
      const timer = setTimeout(() => {
        setExpiryTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (expiryTime === 0) {
      setIsExpired(true);
    }
  }, [expiryTime, isExpired]);

  const generateQrCode = async () => {
    try {
      // Generate a random token
      const token = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `chatShadow-${Date.now()}-${Math.random()}`
      );
      
      // Create QR code data with token
      // In a real app, this would be sent to a backend
      const qrData = JSON.stringify({
        token,
        expires: Date.now() + 120000, // 2 minutes from now
        userId: 'current-user-id'
      });
      
      setQrValue(qrData);
      setExpiryTime(120);
      setIsExpired(false);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={[styles.qrContainer, { backgroundColor: colors.card }]}>
          {isExpired ? (
            <View style={styles.expiredContainer}>
              <Text style={[styles.expiredText, { color: colors.error }]}>QR Code Expired</Text>
              <TouchableOpacity 
                style={[styles.refreshButton, { backgroundColor: colors.primary }]}
                onPress={generateQrCode}
              >
                <RefreshCcw size={20} color="white" />
                <Text style={styles.refreshText}>Generate New Code</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={[styles.qrBox, { backgroundColor: 'white' }]}>
                {/* In a real app, use a proper QR code library */}
                <QrCode size={200} color="black" />
                <Text style={styles.scanText}>Scan with Web App</Text>
              </View>
              <View style={styles.timerContainer}>
                <Text style={[styles.expiresText, { color: colors.textSecondary }]}>
                  Expires in {formatTime(expiryTime)}
                </Text>
              </View>
            </>
          )}
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={[styles.instructionsTitle, { color: colors.text }]}>
            How to login to web
          </Text>
          <View style={styles.stepContainer}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Open ChatShadow Web App on your computer
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Click "Scan QR Code" on the login page
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Scan this QR code with the web app
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Confirm the login on your phone when prompted
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.securityNote}>
        <Text style={[styles.securityText, { color: colors.textSecondary }]}>
          For security, QR codes expire after 2 minutes and can only be used once.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  qrBox: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  scanText: {
    marginTop: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'black',
  },
  timerContainer: {
    marginTop: 16,
  },
  expiresText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  expiredContainer: {
    alignItems: 'center',
    padding: 24,
  },
  expiredText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  refreshText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  instructionsContainer: {
    marginBottom: 32,
  },
  instructionsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: 'white',
  },
  stepText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  securityNote: {
    padding: 24,
    alignItems: 'center',
  },
  securityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});