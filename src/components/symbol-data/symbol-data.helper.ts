import { IRes } from "../../types/interfaces/res.interface";

export function getSymbolDataTableCells(
  data: IRes
): [string, string | number][] {
  return Object.keys(data).map((key) => [key, data[key as keyof IRes]]);
}
