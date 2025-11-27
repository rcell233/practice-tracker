import React from 'react';
import { View } from '../types';
import { LayoutDashboard, CheckCircle, User, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface LayoutProps {
  currentView: View;
  onChangeView: (view: View) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  const navItems = [
    { id: View.Leaderboard, icon: LayoutDashboard, label: 'Leaderboard' },
    { id: View.CheckIn, icon: CheckCircle, label: 'Check In' },
    { id: View.Profile, icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-zinc-100 selection:bg-violet-500/30">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 h-screen p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Tempo</span>
        </div>

        <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onChangeView(item.id)}
                    className={clsx(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                        currentView === item.id 
                            ? "bg-violet-600/10 text-violet-400 border border-violet-500/20" 
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                    )}
                >
                    <item.icon size={20} />
                    {item.label}
                </button>
            ))}
        </nav>

        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">My Stats</h4>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">12<span className="text-sm font-normal text-zinc-600">h</span></span>
                <span className="text-xs text-green-400">+2h this week</span>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[128px] pointer-events-none" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[128px] pointer-events-none" />

         <div className="relative z-10 p-4 md:p-8 h-full flex flex-col">
             <div className="md:hidden flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Activity className="text-violet-500" size={24} />
                    <span className="text-xl font-bold">Tempo</span>
                </div>
             </div>
             
             {children}
         </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 p-2 pb-safe z-50">
        <div className="flex justify-around items-center">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onChangeView(item.id)}
                    className={clsx(
                        "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                        currentView === item.id ? "text-violet-400" : "text-zinc-500"
                    )}
                >
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                    >
                        <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
                    </motion.div>
                    <span className="text-[10px] font-medium">{item.label}</span>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};