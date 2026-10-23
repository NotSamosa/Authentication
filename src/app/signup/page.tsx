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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Get started with our simulated authentication flow</p>
        </div>

        {serverError && <Alert type="error" message={serverError} />}

        <form onSubmit={handleSubmit} className="form-stack" noValidate>
          <FormInput
            id="signup-name"
            label="Full Name"
            type="text"
            name="name"
            placeholder="e.g. Alex Johnson"
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
            label="Email Address"
            type="email"
            name="email"
            placeholder="e.g. alex@example.com"
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
            label="Confirm Password"
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
            {isSubmitting ? 'Creating account...' : 'Create Account'}
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
