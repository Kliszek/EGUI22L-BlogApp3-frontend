import axios from "axios";
import {
  LoginResponse,
  LoginResponseStatus,
} from "../LoginForm/loginResponse.interface";
import BaseHttpService from "./base-http.service";

export default class UsersService extends BaseHttpService {
  static async signin(username: string, password: string): Promise<LoginResponse> {
    const result: any = await axios
      .post(`${this.BASE_URL}/users/signin`, {
        username,
        password,
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 404) {
          return "Wrong combination of username and password!";
        } else {
          console.error(`ERROR: ${error.message}`);
          return "Internal server error!";
        }
      });
    if (result.data) {
      const accessToken = result.data.accessToken;
      this.saveToken(accessToken);
      return { status: LoginResponseStatus.OKAY, error: "", redirect: "blogs" };
    }
    return { status: LoginResponseStatus.ERROR, error: result, redirect: "" };
  }

  static async signup(username: string, password: string) {
    await axios.post(`${this.BASE_URL}/users/signup`, { username, password });
  }

  static async signout() {
    this.removeToken();
  }
}
