import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label className="text-black" htmlFor="email">
        Email:
      </label>
      <input
        className="text-black"
        id="email"
        name="email"
        type="email"
        required
      />
      <label className="text-black" htmlFor="password">
        Password:
      </label>
      <input
        className="text-black"
        id="password"
        name="password"
        type="password"
        required
      />
      <button className="text-black" formAction={login}>
        Log in
      </button>
      <button className="text-black" formAction={signup}>
        Sign up
      </button>
    </form>
  );
}
