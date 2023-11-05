import { redirect } from 'next/navigation';
import userAuth from './userAuth';
import { ReactNode } from 'react';
interface ProtectedProps {
  children: ReactNode;
}
export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = userAuth();
  return isAuthenticated ? children : redirect('/');
}
