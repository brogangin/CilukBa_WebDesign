"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../../actions/auth";

export default function SigninForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="john@example.com" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
}
