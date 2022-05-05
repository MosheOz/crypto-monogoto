import { GridColDef } from "@mui/x-data-grid";
import { IRes } from "../../types/interfaces/res.interface";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";

export function getColsDef(): GridColDef[] {
  return [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 1 },
    {
      field: "lastPrice",
      headerName: "Last Price",
      flex: 1,
      type: "number",
    },
    {
      field: "openPrice",
      headerName: "Open Price",
      flex: 1,
      type: "number",
    },
  ];
}

export function getCellsDef(res: IRes[]): GridCellDef[] {
  return res.map((r: IRes, i: number) => ({
    id: i + 1,
    symbol: r.symbol,
    lastPrice: r.lastPrice,
    openPrice: r.openPrice,
  }));
}
