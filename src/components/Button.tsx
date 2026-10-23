'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...rest
}) => {
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? 'btn-block' : '';

  return (
    <button
      className={`btn ${variantClass} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="spinner" aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
};
