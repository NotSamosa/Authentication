'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="page-container" style={{ alignItems: 'flex-start' }}>
      <div
        className="auth-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          margin: '2rem auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 700,
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}
            >
              Protected Session Active
            </span>
            <h1 className="auth-title" style={{ textAlign: 'left', margin: 0 }}>
              Welcome, {user?.name}!
            </h1>
          </div>
          <Button variant="danger" onClick={handleLogout} style={{ fontSize: '0.85rem' }}>
            Log out
          </Button>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
          You have successfully authenticated. This page is protected by custom React hooks and route guards.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Full Name
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Email Address
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user?.email}</div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              User ID
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {user?.id}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Session Established
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'Just now'}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
          }}
        >
          <div style={{ fontWeight: 600, color: '#c7d2fe', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
            🔒 Protected Routing Verification
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Try refreshing the browser or accessing this URL directly from another tab. Your session will remain active via simulated token persistence in localStorage until you explicitly click &ldquo;Log out&rdquo;.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
