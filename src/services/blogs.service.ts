import BaseHttpService from "./base-http.service";

export default class BlogsService extends BaseHttpService {
  static async getAll(): Promise<any> {
    const result: any = await this.get(`blogs`)
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 404) {
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