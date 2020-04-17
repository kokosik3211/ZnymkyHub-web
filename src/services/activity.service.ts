import axios from "axios";
import { BaseService } from "./base.service";

const auth = {
  headers: { Authorization: "bearer " + localStorage.getItem("auth-token") }
};
class ActivityService extends BaseService {
  private static instance: ActivityService;

  private constructor() {
    super();
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }

  public getActivities(): Promise<any> {
    return axios.get(`${this.api}/activity/activity`, auth);
  }

  public getLikesSaved(): Promise<any> {
    return axios.get(`${this.api}/activity/likessaved`, auth);
  }

  public getGender(): Promise<any> {
    return axios.get(`${this.api}/activity/gender`, auth);
  }

  public getAge(): Promise<any> {
    return axios.get(`${this.api}/activity/age`, auth);
  }

  public getLocation(): Promise<any> {
    return axios.get(`${this.api}/activity/location`, auth);
  }
}

// export a singleton instance in the global namespace
export const activityService = ActivityService.Instance;
