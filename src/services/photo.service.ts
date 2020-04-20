import axios from "axios";
import { BaseService } from "./base.service";

const headers = { Authorization: "bearer " + localStorage.getItem("auth-token") };

class PhotoService extends BaseService {
  private static instance: PhotoService;

  private constructor() {
    super();
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }

  public likePhoto(photoId: number): Promise<any> {
    return axios.post(`${this.api}/image/likephoto`, null, {
        headers: headers,
        params: { photoId : photoId }
    });
  }

  public unlikePhoto(photoId: number): Promise<any> {
    return axios.post(`${this.api}/image/unlikephoto`, null, {
        headers: headers,
        params: { photoId : photoId }
    });
  }

  public savePhoto(photoId: number): Promise<any> {
    return axios.post(`${this.api}/image/savephoto`, null, {
        headers: headers,
        params: { photoId : photoId }
    });
  }

  public unsavePhoto(photoId: number): Promise<any> {
    return axios.post(`${this.api}/image/unsavephoto`, null, {
        headers: headers,
        params: { photoId : photoId }
    });
  }
}

// export a singleton instance in the global namespace
export const photoService = PhotoService.Instance;
