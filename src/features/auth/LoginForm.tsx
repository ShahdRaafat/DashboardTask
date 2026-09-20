"use client";

import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "./authSlice";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

type FormErrors = {
  email?: string;
  password?: string;
};

function LoginForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      router.push("/");
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8 p-4">
      <Logo />
      <div className="flex flex-col items-center gap-2 text-center w-full">
        <h1 className="text-2xl font-bold text-primary">Welcome back</h1>
        <p className="text-sm text-muted">Sign in to access your dashboard</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 rounded-xl border border-border bg-surface p-8 shadow-sm"
      >
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
          placeholder="you@example.com"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={formErrors.password}
          placeholder="••••••••"
        />

        {error && (
          <div className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2.5"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
export default LoginForm;
