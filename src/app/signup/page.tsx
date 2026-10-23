'use client';

import React from 'react';
import Link from 'next/link';
import { useSignupForm } from '@/hooks/useSignupForm';
import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/Button';
import { Alert } from '@/components/Alert';

export default function SignupPage() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSignupForm();

  return (
    <div className="page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Get started with our simulated authentication flow</p>
        </div>

        {serverError && <Alert type="error" message={serverError} />}

        <form onSubmit={handleSubmit} className="form-stack" noValidate>
          <FormInput
            id="signup-name"
            label="Full name"
            type="text"
            name="name"
            placeholder="Alex Johnson"
            value={values.name}
            error={errors.name}
            touched={touched.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            autoComplete="name"
            required
          />

          <FormInput
            id="signup-email"
            label="Email address"
            type="email"
            name="email"
            placeholder="alex@example.com"
            value={values.email}
            error={errors.email}
            touched={touched.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            autoComplete="email"
            required
          />

          <FormInput
            id="signup-password"
            label="Password"
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={values.password}
            error={errors.password}
            touched={touched.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            autoComplete="new-password"
            required
          />

          <FormInput
            id="signup-confirm-password"
            label="Confirm password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            autoComplete="new-password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link href="/login" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
