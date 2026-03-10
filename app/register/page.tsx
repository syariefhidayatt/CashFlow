import Link from "next/link";
import registerUserAction from "../actions/auth";
import Button from "../components/Button";

export default function registerForm() {
  return (
    <main className="h-screen p-4">
      <div>
        <Link
          href="/"
          className="px-3 py-1 rounded-md font-semibold cursor-pointer bg-blue-600 p-4"
        >
          Home
        </Link>
      </div>
      <form action={registerUserAction}>
        <label htmlFor="">username</label>
        <input type="text" name="username" />
        <label htmlFor="">email</label>
        <input type="text" name="email" />
        <label htmlFor="">password</label>
        <input type="password" name="password" />
        <Button type="submit">Register</Button>
      </form>
    </main>
  );
}
