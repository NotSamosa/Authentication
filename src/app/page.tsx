'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="page-container" style={{ flexDirection: 'column', textAlign: 'center', gap: '2.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '999px',
            fontSize: '0.85rem',
            color: '#c7d2fe',
            marginBottom: '1.25rem',
          }}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
          Next.js Custom React Hooks Authentication
        </div>

        <h1
          style={{
            fontSize: '2.75rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Clean, Modular Auth Logic Abstracted in React Hooks
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Simulating real-world authentication locally with synthetic network latency, custom form validation hooks, persistent session management, and protected client routes.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {isLoading ? (
            <div className="spinner" style={{ width: '28px', height: '28px' }} />
          ) : isAuthenticated && user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Go to Dashboard ({user.name}) →
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Try Login Demo →
              </Link>
              <Link href="/signup" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem' }}>
                Create an Account
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          maxWidth: '960px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🪝</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>Custom Hooks</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Form inputs, error tracking, validation, and submission logic encapsulated within <code style={{ color: '#c7d2fe' }}>useLoginForm</code> and <code style={{ color: '#c7d2fe' }}>useSignupForm</code>.
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>Protected Routes</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <code style={{ color: '#c7d2fe' }}>ProtectedRoute</code> guard redirects unauthenticated users automatically to <code style={{ color: '#c7d2fe' }}>/login</code> with session resolution loaders.
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏱️</div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>Simulated API</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Mock backend API with artificial delay, credential validation, seed accounts, and localStorage persistence.
          </p>
        </div>
      </div>
    </div>
  );
}
