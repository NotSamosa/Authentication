'use client';

import React from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isAuthenticated } = useRequireAuth();

  if (isLoading || !isAuthenticated) {
    return (
      <div className="page-container" style={{ minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="spinner" style={{ width: '36px', height: '36px', borderWidth: '3px', borderColor: 'rgba(99, 102, 241, 0.2)', borderTopColor: '#6366f1' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
