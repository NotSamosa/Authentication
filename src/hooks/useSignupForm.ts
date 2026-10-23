'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SignupFormValues, FormErrors } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';

export function useSignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [values, setValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors<SignupFormValues>>({});
  const [touched, setTouched] = useState<Record<keyof SignupFormValues, boolean>>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = useCallback((data: SignupFormValues): FormErrors<SignupFormValues> => {
    const errs: FormErrors<SignupFormValues> = {};

    if (!data.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!data.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!data.password) {
      errs.password = 'Password is required.';
    } else if (data.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!data.confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required.';
    } else if (data.password !== data.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    return errs;
  }, []);

  const handleChange = useCallback(
    (field: keyof SignupFormValues, value: string) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        if (touched[field]) {
          const validationErrors = validate(next);
          setErrors((prevErr) => ({ ...prevErr, [field]: validationErrors[field] }));
        }
        return next;
      });
      if (serverError) setServerError(null);
    },
    [touched, validate, serverError]
  );

  const handleBlur = useCallback(
    (field: keyof SignupFormValues) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const validationErrors = validate(values);
      setErrors((prevErr) => ({ ...prevErr, [field]: validationErrors[field] }));
    },
    [validate, values]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });

      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      setServerError(null);

      try {
        const result = await signup(values);
        if (result.success) {
          router.push('/dashboard');
        } else {
          setServerError(result.error || 'Failed to create account.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setServerError(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, signup, router]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
