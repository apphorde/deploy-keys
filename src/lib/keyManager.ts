
import { useState, useEffect } from 'react';

export interface ApiKey {
  id: string;
  name: string;
  value: string;
  created: Date;
  lastUsed: Date | null;
}

// Local storage key
const API_KEYS_STORAGE_KEY = 'keymaster_api_keys';

// Generate a random API key
function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 32;
  let result = '';
  
  for (let i = 0; i < keyLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `km_${result}`;
}

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);

  // Load keys from localStorage on component mount
  useEffect(() => {
    const storedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (storedKeys) {
      try {
        const parsedKeys = JSON.parse(storedKeys) as ApiKey[];
        // Convert string dates back to Date objects
        const processedKeys = parsedKeys.map(key => ({
          ...key,
          created: new Date(key.created),
          lastUsed: key.lastUsed ? new Date(key.lastUsed) : null
        }));
        setKeys(processedKeys);
      } catch (error) {
        console.error('Failed to parse stored API keys:', error);
        setKeys([]);
      }
    }
    setLoading(false);
  }, []);

  // Save keys to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
    }
  }, [keys, loading]);

  // Create a new API key
  const createKey = (name: string): ApiKey => {
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name,
      value: generateApiKey(),
      created: new Date(),
      lastUsed: null
    };
    
    setKeys(prevKeys => [...prevKeys, newKey]);
    return newKey;
  };

  // Delete an API key
  const deleteKey = (id: string) => {
    setKeys(prevKeys => prevKeys.filter(key => key.id !== id));
  };

  // Copy API key to clipboard
  const copyKeyToClipboard = (keyValue: string): Promise<boolean> => {
    return navigator.clipboard.writeText(keyValue)
      .then(() => true)
      .catch((error) => {
        console.error('Failed to copy API key:', error);
        return false;
      });
  };

  return {
    keys,
    loading,
    createKey,
    deleteKey,
    copyKeyToClipboard
  };
}
