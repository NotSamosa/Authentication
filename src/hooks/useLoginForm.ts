'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginFormValues, FormErrors } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors<LoginFormValues>>({});
  const [touched, setTouched] = useState<Record<keyof LoginFormValues, boolean>>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = useCallback((data: LoginFormValues): FormErrors<LoginFormValues> => {
    const errs: FormErrors<LoginFormValues> = {};

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

    return errs;
  }, []);

  const handleChange = useCallback(
    (field: keyof LoginFormValues, value: string) => {
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
    (field: keyof LoginFormValues) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const validationErrors = validate(values);
      setErrors((prevErr) => ({ ...prevErr, [field]: validationErrors[field] }));
    },
    [validate, values]
  );

  const fillDemoCredentials = useCallback(() => {
    setValues({
      email: 'demo@example.com',
      password: 'Password123!',
    });
    setErrors({});
    setServerError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      setTouched({ email: true, password: true });
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      setServerError(null);

      try {
        const result = await login(values);
        if (result.success) {
          const redirect = searchParams.get('redirect') || '/dashboard';
          router.push(redirect);
        } else {
          setServerError(result.error || 'Authentication failed. Please check credentials.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setServerError(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, login, router, searchParams]
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
    fillDemoCredentials,
  };
}
