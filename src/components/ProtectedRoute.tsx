'use client';

import React from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isAuthenticated } = useRequireAuth();

  if (isLoading || !isAuthenticated) {
    return (
      <div className="page-container" style={{ minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div
            className="spinner"
            style={{
              width: '32px',
              height: '32px',
              borderWidth: '3px',
              borderColor: 'var(--border-color)',
              borderTopColor: 'var(--primary)',
            }}
          />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
