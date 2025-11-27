import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Leaderboard } from './components/Leaderboard';
import { CheckIn } from './components/CheckIn';
import { Profile } from './components/Profile';
import { Auth } from './components/Auth';
import { User, PracticeLog, View, Instrument } from './types';
import { MOCK_USERS, MOCK_LOGS } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  // State Management
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]); // Default logged in
  const [currentView, setCurrentView] = useState<View>(View.Leaderboard);
  
  // Database State (Simulated)
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [logs, setLogs] = useState<PracticeLog[]>(MOCK_LOGS);

  // Handlers
  const handleLogin = (user: User) => {
    // Check if user exists in our "DB", if not add them
    const existing = users.find(u => u.username === user.username);
    if (existing) {
      setCurrentUser(existing);
    } else {
      setUsers([...users, user]);
      setCurrentUser(user);
    }
    setCurrentView(View.Leaderboard);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(View.Auth);
  };

  const handleCheckIn = (instrument: Instrument, duration: number) => {
    if (!currentUser) return;
    
    const newLog: PracticeLog = {
      id: `l-${Date.now()}`,
      userId: currentUser.id,
      instrument,
      durationMinutes: duration,
      timestamp: Date.now()
    };

    setLogs([newLog, ...logs]);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  // If not logged in, show Auth
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  // Content Renderer
  const renderContent = () => {
    switch (currentView) {
      case View.Leaderboard:
        return <Leaderboard users={users} logs={logs} />;
      case View.CheckIn:
        return <CheckIn currentUser={currentUser} onCheckIn={handleCheckIn} />;
      case View.Profile:
        return <Profile user={currentUser} onUpdate={handleUpdateProfile} onLogout={handleLogout} />;
      default:
        return <Leaderboard users={users} logs={logs} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
        <AnimatePresence mode="wait">
            <motion.div
                key={currentView}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    </Layout>
  );
};

export default App;