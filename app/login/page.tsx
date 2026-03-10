import Button from "../components/Button";
import Input from "../components/Input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { loginUserActionProvider } from "../actions/auth";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h2>

        <form>
          <Input label="Username" id="username" type="text" required />
          <Input label="Password" id="password" type="password" required />

          <div className="flex justify-end mb-6">
            <Link
              href="#"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Forgot Password ?
            </Link>
          </div>

          <Button type="submit" className="w-full py-3">
            Sign in
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
          Dont have an account?{" "}
          <Link
            href="/register"
            className="text-white font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
