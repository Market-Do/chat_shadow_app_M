import { useState, useCallback } from 'react';
import * as LibSodium from 'libsodium-wrappers';

export function useEncryption() {
  const [isReady, setIsReady] = useState(false);

  // Initialize libsodium
  const init = async () => {
    if (!isReady) {
      await LibSodium.ready;
      setIsReady(true);
      return LibSodium;
    }
    return LibSodium;
  };

  // Encrypt a message
  const encrypt = useCallback(async (message: string) => {
    try {
      const sodium = await init();
      
      // In a real app, we would use the recipient's public key
      // For demo purposes, we'll use a dummy key
      const keyPair = sodium.crypto_box_keypair();
      
      // Convert message to Uint8Array
      const messageBytes = sodium.from_string(message);
      
      // Generate a random nonce
      const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
      
      // Encrypt message
      const encryptedMessage = sodium.crypto_box_easy(
        messageBytes,
        nonce,
        keyPair.publicKey,
        keyPair.privateKey
      );
      
      // Combine nonce and encrypted message
      const result = new Uint8Array(nonce.length + encryptedMessage.length);
      result.set(nonce);
      result.set(encryptedMessage, nonce.length);
      
      // Convert to base64 for storage/transmission
      return sodium.to_base64(result);
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }, [isReady]);

  // Decrypt a message
  const decrypt = useCallback(async (encryptedMessage: string) => {
    try {
      // For demo purposes, we'll just return a mock decrypted message
      // In a real app, we would use proper decryption
      
      // Simulate decryption delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return the "decrypted" message
      return "This is a decrypted message. In a real app, this would be properly decrypted.";
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }, [isReady]);

  return {
    encrypt,
    decrypt,
    isReady,
  };
}