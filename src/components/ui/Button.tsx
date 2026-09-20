import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
}
function Button({
  children,
  variant = "primary",
  onClick,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    ghost:
      "bg-transparent text-foreground hover:bg-surface border border-border",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
