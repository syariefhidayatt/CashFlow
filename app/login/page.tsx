"use client";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useActionState, useEffect, useState } from "react";
import registerUserAction, {
  loginCredentialsAction,
  loginUserActionProvider,
  ActionState,
} from "../actions/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginState, loginAction, isLoginPending] = useActionState<
    ActionState,
    FormData
  >(loginCredentialsAction, {});

  const [registerState, registerAction, isRegisterPending] = useActionState<
    ActionState,
    FormData
  >(registerUserAction, {});

  const currentState = isLogin ? loginState : registerState;
  const currentAction = isLogin ? loginAction : registerAction;
  const currentPending = isLogin ? isLoginPending : isRegisterPending;

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    if (registerState?.success) {
      const timer = setTimeout(() => {
        setIsLogin(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [registerState?.success]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {isLogin ? "Login" : "Create an Account"}
        </h2>

        <form action={currentAction}>
          {currentState?.error && (
            <p className="text-red-500 mb-2">{currentState?.error}</p>
          )}{" "}
          {currentState?.success && (
            <p className="text-green-500 mb-2">{currentState.success}</p>
          )}{" "}
          {!isLogin && (
            <Input label="Full Name" name="name" id="name" type="text" />
          )}{" "}
          <Input label="Email" name="email" id="email" type="email" />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
          />
          <div className="flex justify-end mb-6">
            <Link
              href="#"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {isLogin ? "Forgot Password?" : ""}
            </Link>
          </div>
          <Button type="submit" disabled={currentPending} className="w-full">
            {currentPending ? "Memproses..." : isLogin ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px bg-slate-700 flex-1"></div>
          <span className="text-slate-400 text-sm">
            Login with social accounts
          </span>
          <div className="h-px bg-slate-700 flex-1"></div>
        </div>

        <div className="flex justify-center mt-6 cursor-pointer">
          <form action={loginUserActionProvider.bind(null, "google")}>
            <Button type="submit" variant="netral">
              <FcGoogle size={30} />
            </Button>
          </form>
          <form action={loginUserActionProvider.bind(null, "github")}>
            <Button type="submit" variant="netral">
              <SiGithub size={30} />
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-400 mt-8 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={toggleAuthMode}
            className="text-white font-bold hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </main>
  );
}
