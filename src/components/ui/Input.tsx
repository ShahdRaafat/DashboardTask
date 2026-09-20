import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
function Input({ id, label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`rounded-md border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/40 ${
          error ? "border-danger" : "border-border"
        }`}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export default Input;
