import React, { useState } from 'react';
import { User, Instrument } from '../types';
import { Card, Button, Input, Label, Badge } from './UI';
import { INSTRUMENT_ICONS } from '../constants';
import { Save, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [username, setUsername] = useState(user.username);
  const [instruments, setInstruments] = useState<Instrument[]>(user.instruments);

  const toggleInstrument = (inst: Instrument) => {
    if (instruments.includes(inst)) {
      setInstruments(instruments.filter(i => i !== inst));
    } else {
      setInstruments([...instruments, inst]);
    }
  };

  const handleSave = () => {
    onUpdate({
      ...user,
      username,
      instruments
    });
    // Visual feedback handled by parent or simple toast logic usually
    alert('Profile updated!');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8">
            <div className="flex items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                    <img src={user.avatarUrl} alt={user.username} className="w-24 h-24 rounded-full border-4 border-zinc-800 group-hover:border-violet-500 transition-colors object-cover" />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-white">Edit</span>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{username}</h2>
                    <p className="text-zinc-500">Member since 2024</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <Label>Display Name</Label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <Input 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="pl-10"
                        />
                    </div>
                </div>

                <div>
                    <Label>My Instruments</Label>
                    <p className="text-xs text-zinc-500 mb-3">Select the instruments you practice.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {Object.values(Instrument).map((inst) => {
                            const isSelected = instruments.includes(inst);
                            return (
                                <button
                                    key={inst}
                                    onClick={() => toggleInstrument(inst)}
                                    className={`
                                        flex flex-col items-center justify-center p-3 rounded-lg border text-sm transition-all
                                        ${isSelected 
                                            ? 'bg-violet-900/30 border-violet-500 text-white' 
                                            : 'bg-zinc-950/50 border-zinc-800 text-zinc-500 hover:bg-zinc-900'}
                                    `}
                                >
                                    <span className="text-2xl mb-1">{INSTRUMENT_ICONS[inst]}</span>
                                    <span>{inst}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <Button variant="ghost" onClick={onLogout} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                        Log Out
                    </Button>
                    <Button onClick={handleSave} className="px-8">
                        <Save size={18} /> Save Changes
                    </Button>
                </div>
            </div>
        </Card>
      </motion.div>
    </div>
  );
};