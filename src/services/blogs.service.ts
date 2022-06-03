import { AxiosError } from "axios";
import { Blog } from "../Interfaces/blog.interface";
import BaseHttpService from "./base-http.service";
import { OptionsObject } from "./options-object.interface";

export default class BlogsService extends BaseHttpService {
  static async getBlogs(options: OptionsObject = {}): Promise<Blog[]> {
    return await this.get(`blogs`, options)
      .then((result) => {
        return result.data;
      })
      .catch((error: AxiosError) => {
        if(error.name === 'CanceledError') {
          console.log("Canceled");
        } else {
          console.error(`ERROR: ${error.message}`);
          throw error;
        }
      });
  }
}