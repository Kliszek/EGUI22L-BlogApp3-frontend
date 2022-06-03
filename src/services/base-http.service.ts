import axios, { AxiosError } from "axios";

export default class BaseHttpService {
  static BASE_URL: string = "http://localhost:3001";
  static _accessToken: string | null = null;

  static async get(endpoint: string, options: object = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options)
    .catch((error: AxiosError) => {
      if(error.name === 'CanceledError') {
        console.log("Canceled");
        throw new Error("GET canceled");
      } else {
        console.error(`ERROR: ${error.message}`);
        throw error;
      }
    });
    //catch errors later
  }

  static async post(endpoint: string, data: object = {}, options: object = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, options);
    //catch errors later
  }

  static saveToken(accessToken: string): void {
    this._accessToken = accessToken;
    return localStorage.setItem("accessToken", accessToken);
  }

  static loadToken(): string | null {
    const token: string | null = localStorage.getItem("accessToken");
    this._accessToken = token;
    return token;
  }

  static removeToken(): void {
    this._accessToken = null;
    return localStorage.removeItem("accessToken");
  }

  static _getCommonOptions(): object {
    const token = this.loadToken();
    if (token)
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    else return {};
  }
}
