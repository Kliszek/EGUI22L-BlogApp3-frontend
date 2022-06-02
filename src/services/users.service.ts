import axios from "axios";
import BaseHttpService from "./base-http.service";

export default class UsersService extends BaseHttpService {
  static async signin(username: string, password: string) {
    const result: any = await axios
      .post(`${this.BASE_URL}/users/signin`, {
        username,
        password,
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 404)
          console.log("Wrong combination of username and password!");
        else console.error(`ERROR: ${error.message}`);
      });
    if (result) {
      const accessToken = result.data.accessToken;
      this.saveToken(accessToken);
    }
    return;
  }

  static async signup(username: string, password: string) {
    await axios.post(`${this.BASE_URL}/users/signup`, { username, password });
  }

  static async signout() {
    this.removeToken();
  }
}
