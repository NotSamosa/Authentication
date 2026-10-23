'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>AuthFlow</span>
      </Link>

      <div className="nav-links">
        {isLoading ? (
          <div className="spinner" style={{ width: '16px', height: '16px' }} />
        ) : isAuthenticated && user ? (
          <>
            <Link
              href="/dashboard"
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              Dashboard
            </Link>
            <span
              style={{
                fontSize: '0.85rem',
                padding: '0.25rem 0.65rem',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '999px',
                color: '#c7d2fe',
              }}
            >
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
