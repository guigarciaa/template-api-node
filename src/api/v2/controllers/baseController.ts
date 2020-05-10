import express from "express";

export default class BaseController {
  protected getParametersRequest(req: express.Request) {
    if (req.query) {
      let output: any = {};
      Object.entries(req.query).forEach(([paramName, paramValue]) => {
        output[paramName.toString().toLocaleLowerCase()] = paramValue;
      });
      return output;
    } else {
      return null;
    }
  }

  protected replaceDomain(user: string): string {
    user = user.substr(user.lastIndexOf("\\") + 1);
    return user;
  }

  protected returnErroJson(res: express.Response, codeError: number, message: string): express.Response {
    return res.status(codeError).json({ err: message });
  }

}
