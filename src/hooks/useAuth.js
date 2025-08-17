'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../utils/api';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async (retries = 3, delay = 1000) => {
      try {
        const authenticated = await checkAuth();
        if (authenticated) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Not authenticated');
        }
      } catch (err) {
        if (retries > 0) {
          console.log(`Retrying auth check (${retries} attempts left)...`);
          setTimeout(() => verifyAuth(retries - 1, delay), delay);
        } else {
          console.error('Auth check failed:', err);
          setIsAuthenticated(false);
          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, [router]);

  return { isAuthenticated, loading };
}