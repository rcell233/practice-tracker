import React, { useState } from 'react';
import { Card, Button, Input, Label } from './UI';
import { User, Instrument } from '../types';
import { Activity } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    // Simulate Auth
    const mockUser: User = {
      id: `u-${Date.now()}`,
      username: username,
      avatarUrl: `https://picsum.photos/200?random=${Date.now()}`,
      instruments: [Instrument.Guitar], // Default for new users
    };

    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-background to-background">
        <div className="mb-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/20 mb-4">
                <Activity className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Tempo</h1>
            <p className="text-zinc-500">Master your craft, together.</p>
        </div>

        <Card className="w-full max-w-sm p-8 border-zinc-800">
            <h2 className="text-xl font-semibold mb-6 text-center text-zinc-100">
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Username</Label>
                    <Input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="musician123"
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <Button className="w-full mt-2" type="submit">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
            </form>
            
            <div className="mt-6 text-center">
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-zinc-400 hover:text-white underline underline-offset-4"
                >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
            </div>
        </Card>
    </div>
  );
};