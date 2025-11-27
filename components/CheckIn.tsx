import React, { useState } from 'react';
import { User, Instrument } from '../types';
import { Card, Button, Badge } from './UI';
import { INSTRUMENT_ICONS } from '../constants';
import { Clock, CheckCircle2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckInProps {
  currentUser: User;
  onCheckIn: (instrument: Instrument, duration: number) => void;
}

export const CheckIn: React.FC<CheckInProps> = ({ currentUser, onCheckIn }) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(
    currentUser.instruments.length > 0 ? currentUser.instruments[0] : null
  );
  const [duration, setDuration] = useState(30);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedInstrument) return;
    onCheckIn(selectedInstrument, duration);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (currentUser.instruments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
        <Music size={48} className="mb-4 text-zinc-600" />
        <p>Please select an instrument in your profile to start checking in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 w-full">
      <AnimatePresence mode='wait'>
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Great Job!</h2>
            <p className="text-zinc-400">Your {duration} minutes of practice have been logged.</p>
            <Button variant="outline" className="mt-8" onClick={() => setIsSubmitted(false)}>
              Check in again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8 border-violet-500/20 shadow-2xl shadow-violet-900/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Time to Practice</h2>
                <p className="text-zinc-400 text-sm">Log your session and climb the ranks.</p>
              </div>

              <div className="space-y-8">
                {/* Instrument Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Instrument</label>
                  <div className="grid grid-cols-2 gap-3">
                    {currentUser.instruments.map((inst) => (
                      <button
                        key={inst}
                        onClick={() => setSelectedInstrument(inst)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 ${
                          selectedInstrument === inst
                            ? 'bg-violet-600/20 border-violet-500 text-white shadow-inner'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span className="text-3xl">{INSTRUMENT_ICONS[inst]}</span>
                        <span className="font-medium text-sm">{inst}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <label className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Duration</label>
                     <span className="text-3xl font-bold text-cyan-400 tabular-nums">
                        {duration}<span className="text-sm font-normal text-zinc-500 ml-1">min</span>
                     </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-zinc-600 font-mono">
                    <span>5m</span>
                    <span>180m</span>
                  </div>
                </div>

                <Button 
                    size="lg" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500"
                    onClick={handleSubmit}
                    disabled={!selectedInstrument}
                >
                  Confirm Session
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};