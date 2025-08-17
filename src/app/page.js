'use client';
import Button from '../components/Button';
import { loginWithGoogle } from '../utils/api';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">YouTube Video Manager</h1>
      <Button onClick={loginWithGoogle}>Sign in with Google</Button>
    </div>
  );
}