import { GridColDef } from "@mui/x-data-grid";

export function getColsDef(): GridColDef[] {
  return [
    { field: "id", headerName: "ID", width: 25 },
    { field: "symbol", headerName: "Symbol", width: 200 },
    {
      field: "lastPrice",
      headerName: "Last Price",
      width: 200,
      type: "number",
    },
    {
      field: "openPrice",
      headerName: "Open Price",
      width: 200,
      type: "number",
    },
  ];
}
