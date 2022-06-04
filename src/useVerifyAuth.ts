import jwt_decode from 'jwt-decode';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseHttpService from "./services/base-http.service";

interface jwtDecodedObject {
  exp: number;
  iat: number;
  [x: string | number | symbol ]: unknown;
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
    }
    navigate('/signin');
  },[navigate]);
  return;
}

export default useVerifyAuth;