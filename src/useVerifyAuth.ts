import jwt_decode from 'jwt-decode';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseHttpService from "./services/base-http.service";

interface jwtDecodedObject {
  exp: number;
  iat: number;
  [x: string | number | symbol ]: unknown;
}

export const getUsername = (): string => {
  const token: string|null = BaseHttpService.loadToken();
  if(token) {
    const decodedToken: jwtDecodedObject = jwt_decode(token);
    if(decodedToken.username) {
      return decodedToken.username as string;
    }
  }
  return '';
}

const useVerifyAuth = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const token: string|null = BaseHttpService.loadToken();
    if(token) {
      const decodedToken: jwtDecodedObject = jwt_decode(token);
      if(decodedToken && decodedToken.exp && decodedToken.exp > (Date.now()/1000)) {
        return;
      }
      else{
        navigate('/signin', {state:{message:'Your session has expired, please log in again.'}});
        BaseHttpService.removeToken();
        return;
      }
    }
    navigate('/signin');
  },[navigate]);
  return;
}

export default useVerifyAuth;