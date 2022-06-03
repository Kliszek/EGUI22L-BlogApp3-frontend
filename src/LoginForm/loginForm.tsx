import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import UsersService from "../services/users.service";

export const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    await UsersService.signin(username, password)
    .then(() => {
      window.location.href = '/blogs';
    })
    .catch((error:AxiosError) => {
      setError(error.message);
    })
    .finally(()=>{
      setIsPending(false);
    })
  };

  return (
    <div className="row justify-content-center vh-100 align-items-center">
      <div className="col-10 col-md-8 col-lg-6 col-xl-5 card ">
        <div className="card-body p-3 m-3">
          <div className="mb-3 border-1 border-bottom">
            <h3 className="h3 pb-2 text-start fw-semibold">Log in</h3>
            <p className="small text-start">Please fill in your username and password to continue.</p>
          </div>
          {error && <div className="mb-3 text-danger ">
            {error}
          </div>}
          <form
            onSubmit={handleLogin}
            className="d-flex flex-column"
          >
            <input
              placeholder="Your username..."
              id="usernameInput"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="mb-3 p-2"
            ></input>
            <input
              placeholder="Your password..."
              id="passwordInput"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mb-4 p-2"
            />
            {isPending && <button className='btn btn-primary disabled'>Logging in...</button>}
            {!isPending && <button className='btn btn-primary'>Log in</button>}
          </form>
          <div className="mt-3 pt-2 border-1 border-top">
            <Link to="/signup">You can also create an account!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
