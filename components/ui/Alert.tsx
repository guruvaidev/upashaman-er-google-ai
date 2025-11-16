
import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  title: string;
  description: string;
}

const Alert: React.FC<AlertProps> = ({ variant = 'default', title, description }) => {
  const variantClasses = {
    default: 'border-border text-foreground',
    destructive: 'border-destructive text-destructive',
  };

  return (
    <div className={`relative w-full rounded-lg border p-4 ${variantClasses[variant]}`}>
      <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
      <div className="text-sm">{description}</div>
    </div>
  );
};

export default Alert;
