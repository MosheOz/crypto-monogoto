import { IAnalyzeRes } from "../../types/interfaces/analyze-res.interface";
import { IErrorInterface, IRes } from "../../types/interfaces/res.interface";

export function analyzeRes(res: IErrorInterface | IRes): IAnalyzeRes {
  if (isAnErrorRes(res)) {
    return { isError: true, msg: res.msg };
  }
  return {
    isError: !isPositiveChange(res),
    msg: isPositiveChange(res) ? "" : "No positive change for this symbol",
  };
}

function isAnErrorRes(obj: any): obj is IErrorInterface {
  return "code" in obj;
}

function isPositiveChange(res: IRes): boolean {
  return res.lastPrice > res.prevClosePrice;
}
