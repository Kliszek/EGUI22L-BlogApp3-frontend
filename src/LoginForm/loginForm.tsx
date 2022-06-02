import { FormEvent, useState } from "react";
import UsersService from "../services/users.service";

export const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    UsersService.signin(username, password);
  };

  return (
    <div className="row justify-content-center">
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column col-8 col-md-6 col-lg-4 col-xl-3 py-5"
      >
        <label htmlFor="usernameInput" className="h5">
          Username
        </label>
        <input
          id="usernameInput"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="mb-3 p-1"
        ></input>
        <label htmlFor="passwordInput" className="h5">
          Password
        </label>
        <input
          id="passwordInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="mb-4 p-1"
        />
        <button className="btn btn-secondary">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
