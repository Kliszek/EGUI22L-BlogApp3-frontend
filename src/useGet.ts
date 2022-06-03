import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseHttpService from "./services/base-http.service";

const useGet = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const abortCont = new AbortController();

    BaseHttpService
      .get(url, { signal: abortCont.signal })
      .then((response: AxiosResponse) => {
        setData(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          console.log("Could not authorize, redirecting to login page.");
          navigate("/signin");
        } else {
          console.log(error);
          setError(error.message);
        }
      });

    return () => abortCont.abort();
  }, [url, navigate]);

  return { data, isPending, error };
};

export default useGet;
