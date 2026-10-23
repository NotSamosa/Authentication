'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="page-container" style={{ flexDirection: 'column', textAlign: 'center', gap: '3.5rem', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div className="feature-badge">
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
          Custom React Hooks Architecture
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            color: 'var(--text-primary)',
          }}
        >
          Clean, modern authentication built with React hooks
        </h1>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.25rem',
          }}
        >
          Simulating real-world authentication locally with synthetic network latency, custom form validation hooks, persistent session storage, and protected client routes.
        </p>

        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {isLoading ? (
            <div className="spinner" style={{ width: '24px', height: '24px' }} />
          ) : isAuthenticated && user ? (
            <Link href="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
              Go to Dashboard ({user.name}) →
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Try Login Demo →
              </Link>
              <Link href="/signup" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem' }}>
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: '960px',
          width: '100%',
        }}
      >
        <div className="feature-card">
          <div className="feature-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <h2 className="feature-card-title">Custom Hooks Logic</h2>
          <p className="feature-card-desc">
            Form inputs, error tracking, field validation, and submission logic encapsulated within <span className="code-pill">useLoginForm</span> and <span className="code-pill">useSignupForm</span>.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="feature-card-title">Protected Routes</h2>
          <p className="feature-card-desc">
            <span className="code-pill">ProtectedRoute</span> guard redirects unauthenticated users automatically to <span className="code-pill">/login</span> while preserving session hydration state.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h2 className="feature-card-title">Simulated API Latency</h2>
          <p className="feature-card-desc">
            Mock backend API simulating 800ms network latency, realistic credential checking, seed accounts, and localStorage session tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
