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
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to access your protected dashboard</p>
      </div>

      {serverError && <Alert type="error" message={serverError} />}

      <form onSubmit={handleSubmit} className="form-stack" noValidate>
        <FormInput
          id="login-email"
          label="Email Address"
          type="email"
          name="email"
          placeholder="e.g. demo@example.com"
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
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <button
        type="button"
        onClick={fillDemoCredentials}
        className="demo-pill-btn"
      >
        ⚡ Click to autofill demo account (demo@example.com)
      </button>

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
            <p style={{ color: 'var(--text-secondary)' }}>Loading login form...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
