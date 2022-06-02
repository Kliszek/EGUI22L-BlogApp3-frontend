import axios from "axios";

export default class BaseHttpService {
  BASE_URL: string = "http://localhost:3001";
  _accessToken: string | null = null;

  async get(endpoint: string, options: object = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.post(`${this.BASE_URL}/${endpoint}`, options);
    //catch errors later
  }

  async post(endpoint: string, data: object = {}, options: object = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, options);
    //catch errors later
  }

  saveToken(accessToken: string): void {
    this._accessToken = accessToken;
    return localStorage.setItem("accessToken", accessToken);
  }

  loadToken(): string | null {
    const token: string | null = localStorage.getItem("accessToken");
    this._accessToken = token;
    return token;
  }

  removeToken(): void {
    this._accessToken = null;
    return localStorage.removeItem("accessToken");
  }

  _getCommonOptions(): object {
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
