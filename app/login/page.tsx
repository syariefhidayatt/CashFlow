import { loginUserAction, loginUserActionProvider } from "../actions/auth";

export default function loginForm() {
  return (
    <div>
      <form action={loginUserAction}>
        <label htmlFor="">email</label>
        <input type="text" name="email" />
        <label htmlFor="">password</label>
        <input type="text" name="password" />
        <button type="submit">Login</button>
      </form>
      <form action={loginUserActionProvider}>
        <button type="submit">Login with Github</button>
      </form>
    </div>
  );
}
