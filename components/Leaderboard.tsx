import React, { useState, useMemo } from 'react';
import { User, PracticeLog, TimeFrame, Instrument } from '../types';
import { Card, Button, Badge } from './UI';
import { INSTRUMENT_ICONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Clock, Trophy, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardProps {
  users: User[];
  logs: PracticeLog[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, logs }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.Week);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | 'All'>('All');

  // Logic to process data
  const data = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    let filteredLogs = logs.filter(log => {
      if (selectedInstrument !== 'All' && log.instrument !== selectedInstrument) return false;
      
      const diff = now - log.timestamp;
      switch (timeFrame) {
        case TimeFrame.Day: return diff < oneDay;
        case TimeFrame.Week: return diff < oneDay * 7;
        case TimeFrame.Month: return diff < oneDay * 30;
        case TimeFrame.All: return true;
        default: return true;
      }
    });

    const userStats: Record<string, number> = {};
    users.forEach(u => userStats[u.id] = 0);

    filteredLogs.forEach(log => {
      if (userStats[log.userId] !== undefined) {
        userStats[log.userId] += log.durationMinutes;
      }
    });

    return Object.entries(userStats)
      .map(([userId, minutes]) => {
        const user = users.find(u => u.id === userId);
        return {
          name: user?.username || 'Unknown',
          avatar: user?.avatarUrl,
          minutes,
          hours: (minutes / 60).toFixed(1),
          instruments: user?.instruments || []
        };
      })
      .sort((a, b) => b.minutes - a.minutes);
  }, [logs, users, timeFrame, selectedInstrument]);

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full pb-20">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
          {Object.values(TimeFrame).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeFrame === tf 
                ? 'bg-zinc-800 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
           <Filter size={16} className="text-zinc-500" />
           <select 
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-violet-500"
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value as Instrument | 'All')}
           >
              <option value="All">All Instruments</option>
              {Object.values(Instrument).map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
           </select>
        </div>
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 min-h-[400px] flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Leaderboard
          </h2>
          {data.every(d => d.minutes === 0) ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
              <Clock size={48} className="mb-4 opacity-20" />
              <p>No practice data for this period.</p>
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{ fill: '#a1a1aa', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="minutes" radius={[0, 4, 4, 0]} barSize={32}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Top 3 & Stats */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-zinc-200">Top Performers</h3>
            <div className="space-y-4">
              {data.slice(0, 3).map((user, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={user.name} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-900"
                >
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-zinc-800" />
                    <div className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-yellow-500 text-yellow-950' :
                      idx === 1 ? 'bg-zinc-400 text-zinc-900' :
                      'bg-orange-700 text-orange-200'
                    }`}>
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <div className="flex gap-1 mt-1">
                      {user.instruments.map(i => (
                        <span key={i} title={i} className="text-xs opacity-50">{INSTRUMENT_ICONS[i]}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-violet-400">{user.hours}h</p>
                  </div>
                </motion.div>
              ))}
              {data.length === 0 && <p className="text-sm text-zinc-500">No data available.</p>}
            </div>
          </Card>
        </div>
      </div>

      {/* Detailed List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((user, idx) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (idx * 0.05) }}
          >
             <Card className="p-4 flex items-center justify-between group hover:border-violet-500/30 transition-colors">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm font-mono">
                      #{idx + 1}
                   </div>
                   <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">{user.name}</span>
                      <span className="text-xs text-zinc-500">{user.minutes} mins</span>
                   </div>
                </div>
                <div className="h-1 flex-1 mx-4 bg-zinc-800 rounded-full overflow-hidden">
                   <div 
                      className="h-full bg-violet-600 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" 
                      style={{ width: `${(user.minutes / (data[0]?.minutes || 1)) * 100}%` }}
                   ></div>
                </div>
             </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};