import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl border border-border shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`p-4 border-b border-border ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
