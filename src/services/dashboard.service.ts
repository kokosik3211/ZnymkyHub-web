import axios from "axios";
import { BaseService } from "./base.service";

const auth = {
  headers: { Authorization: "bearer " + localStorage.getItem("auth-token") }
};
class DashboardService extends BaseService {
  private static instance: DashboardService;

  private constructor() {
    super();
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }

  public getHomeDetails(): Promise<any> {
    return axios.get(`${this.api}/dashboard/home`, auth);
  }

  public getUserProfileDetails(id: any): Promise<any> {
    return axios.get(`${this.api}/profile/getuserprofileinfo`, { params: { id: id }});
  }

  public addPhotographerToFavourite(photographerId: number): Promise<any> {
    return axios.post(`${this.api}/profile/favouritephotographer`, null, {
        headers: auth.headers,
        params: { photographerId : photographerId }
    });
  }

  public removePhotographerFromFavourite(photographerId: number): Promise<any> {
    return axios.post(`${this.api}/profile/unfavouritephotographer`, null, {
        headers: auth.headers,
        params: { photographerId : photographerId }
    });
  }

  public getFavouritePhotographers(): Promise<any> {
    return axios.get(`${this.api}/dashboard/getfavouritephotographers`, auth);
  }
}

// export a singleton instance in the global namespace
export const dashboardService = DashboardService.Instance;
