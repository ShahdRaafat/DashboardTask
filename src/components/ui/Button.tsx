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
  disabled,
}: ButtonProps) {
  const base =
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    ghost:
      "bg-transparent text-foreground hover:bg-primary/10 border border-border",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
