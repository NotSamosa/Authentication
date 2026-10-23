'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useLoginForm } from '@/hooks/useLoginForm';
import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Alert';

function LoginForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
    fillDemoCredentials,
  } = useLoginForm();

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-brand-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Enter your credentials to access your account</p>
      </div>

      {serverError && <Alert type="error" message={serverError} />}

      <form onSubmit={handleSubmit} className="form-stack" noValidate>
        <FormInput
          id="login-email"
          label="Email address"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          autoComplete="email"
          required
        />

        <FormInput
          id="login-password"
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          autoComplete="current-password"
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="demo-helper-box">
        <div className="demo-helper-info">
          <span className="demo-helper-label">Demo Credentials</span>
          <span className="demo-helper-text">demo@example.com</span>
        </div>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="demo-fill-btn"
        >
          Auto-fill
        </button>
      </div>

      <div className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link href="/signup" style={{ fontWeight: 600 }}>
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="page-container">
      <Suspense
        fallback={
          <div className="auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading sign-in form...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
