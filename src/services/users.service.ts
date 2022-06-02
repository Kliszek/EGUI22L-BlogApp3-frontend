import axios from "axios";
import BaseHttpService from "./base-http.service";

export default class UsersService extends BaseHttpService{
  static async signin(username: string, password: string) {
    const result = await axios.post(`${this.BASE_URL}/users/signin`, {
      username,
      password,
    });
    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return result.data.username;
  }

  static async signup(username: string, password: string) {
    await axios.post(`${this.BASE_URL}/users/signup`, { username, password });
  }

  static async signout() {
    this.removeToken();
  }
}