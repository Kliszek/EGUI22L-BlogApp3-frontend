import BaseHttpService from "./base-http.service";
import { OptionsObject } from "./options-object.interface";

export default class BlogsService extends BaseHttpService {
  static async getBlogs(options: OptionsObject = {}): Promise<any> {
    const result: any = await this.get(`blogs`, options)
      .catch((error) => {
        if(error === `CanceledError: canceled`) {
          console.log("Canceled");
        } else if (error.response && (error.response.status === 403 || error.response.status === 404)) {
          return "Cound not fetch blogs!";
        } else {
          console.error(`ERROR: ${error.message}`);
          return "Internal server error!";
        }
      });

    if (result.data) {
      return result.data;
    }
    return { };
  }
}