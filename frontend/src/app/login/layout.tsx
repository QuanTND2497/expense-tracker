import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login | Expense Tracker',
  description: 'Login to your account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
} 