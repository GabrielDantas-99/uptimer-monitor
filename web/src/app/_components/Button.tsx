'use client';

import { FC, ReactElement, ReactNode } from 'react';
import { Button as ButtonCN } from '@/components/ui/button';
export interface IButtonProps {
  label?: string | ReactNode;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  className?: string;
  children: ReactNode;
  role?: string;
  onClick?: (event?: any) => void;
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const Button: FC<IButtonProps> = (props): ReactElement => {
  const { id, label, icon, className, disabled, role, type, onClick, variant, children } = props;

  return (
    <ButtonCN
      id={id}
      type={type}
      className={className}
      role={role}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </ButtonCN>
  )
}

export default Button;
