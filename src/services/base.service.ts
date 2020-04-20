import { Observable } from "rxjs/Rx";
import { baseUrl } from "../constants";

export abstract class BaseService {
  protected readonly api = `${baseUrl}/api`;

  protected handleError(error: any) {
    const applicationError = error.headers["Application-Error"];

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    let modelStateErrors: any = "";

    if (error.data) {
      for (const key in error.data) {
        if (error.data[key]) {
          modelStateErrors += error.data[key] + "\n";
        }
      }
    }

    modelStateErrors = modelStateErrors == "" ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || "Server error");
  }
}
