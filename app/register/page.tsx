import registerUserAction from "../actions/auth";

export default function registerForm() {
  return (
    <form action={registerUserAction}>
      <label htmlFor="">username</label>
      <input type="text" name="username" />
      <label htmlFor="">email</label>
      <input type="text" name="email" />
      <label htmlFor="">password</label>
      <input type="password" name="password" />
      <button type="submit">Register</button>
    </form>
  );
}
