import React, { createContext, useContext, useState } from 'react';

const MOCK_TEAM = [
  { id: 'u1', name: 'Alex Kim', initials: 'AK', color: '#4f46e5' },
  { id: 'u2', name: 'Sam Rivera', initials: 'SR', color: '#0891b2' },
  { id: 'u3', name: 'Jordan Lee', initials: 'JL', color: '#059669' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser] = useState(MOCK_TEAM[0]);

  return (
    <AuthContext.Provider value={{ currentUser, teamMembers: MOCK_TEAM }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
