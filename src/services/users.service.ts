import axios, { AxiosError } from "axios";
import BaseHttpService from "./base-http.service";

export default class UsersService extends BaseHttpService {
  static async signin(
    username: string,
    password: string
  ): Promise<void> {
    return await axios
      .post(`${this.BASE_URL}/users/signin`, {
        username,
        password,
      })
      .then((result) => {
        const accessToken = result.data.accessToken;
        this.saveToken(accessToken);
        //return {success: true, error: '', redirect:'/blogs'};
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 403 || error.response?.status === 404) {
          //return {success: false, error: 'Wrong combination of username and password!', redirect:''};
          throw new Error("Wrong combination of username and password!");
        } else {
          console.error(`ERROR: ${error.message}`);
          throw error;
        }
      });
    // if (result.data) {
    //   const accessToken = result.data.accessToken;
    //   this.saveToken(accessToken);
    //   return { status: LoginResponseStatus.OKAY, error: "", redirect: "/blogs" };
    // }
    // return { status: LoginResponseStatus.ERROR, error: result, redirect: "" };
  }

  static async signup(username: string, password: string) {
    await axios.post(`${this.BASE_URL}/users/signup`, { username, password });
  }

  static async signout() {
    this.removeToken();
  }
}
