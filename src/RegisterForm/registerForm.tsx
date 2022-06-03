import { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import UsersService from "../services/users.service";

export const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rPassword, setRPassword] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    setError('');
    if(username.length < 3 || username.length > 20) {
      setError('Username should be 3-20 characters long!');
    }
    else if(email.length < 3) {
      setError('Please provide correct email address!');
    }
    else if(password.length < 8) {
      setError('Password length should be at least 8 characters!');
    }
    else if(password !== rPassword) {
      setError('Provided passwords don\'t match!');
    }
    else {
      await UsersService.signup(username, email, password)
      .then(async () => {
        await UsersService.signin(username, password)
        .then(() => {
          window.location.href = '/blogs';
        })
        .catch((error:AxiosError) => {
          console.log(error);
          window.location.href = '/signin';
        });
      })
      .catch((error:AxiosError) => {
        const response: AxiosResponse|undefined = error.response;
        setError(response ? response.data.message : error.message);
      });
    }
    setIsPending(false);
  };

  return (
    <div className="row justify-content-center vh-100 align-items-center">
      <div className="col-10 col-md-8 col-lg-6 col-xl-5 card ">
        <div className="card-body p-3 m-3">
          <div className="mb-3 border-1 border-bottom">
            <h3 className="h3 pb-2 text-start fw-semibold">Register</h3>
            <p className="small text-start">Please fill in your data and submit to create a new account.</p>
          </div>
          {error && <div className="mb-3 text-danger ">
            {error}
          </div>}
          <form
            onSubmit={handleRegister}
            className="d-flex flex-column"
          >
            <input
              required
              placeholder="Your email..."
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mb-3 p-2"
            ></input>
            <input
              required
              placeholder="Your username..."
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="mb-3 p-2"
            ></input>
            <input
              required
              placeholder="Your password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mb-3 p-2"
            />
            <input
              required
              placeholder="Repeat your password..."
              type="password"
              onChange={(e) => setRPassword(e.target.value)}
              value={rPassword}
              className="mb-4 p-2"
            />
            {isPending && <button className='btn btn-primary disabled'>Loading...</button>}
            {!isPending && <button className='btn btn-primary'>Create account</button>}
          </form>
          <div className="mt-3 pt-2 border-1 border-top">
            <Link to="/signin">Already have an account? Login here!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
