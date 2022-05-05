import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type GridCellDef = {
  id: number;
  symbol: string;
  lastPrice: number;
  openPrice: number;
};

type symbolsTableType = {
  columns: GridColDef[];
  rows: GridCellDef[];
};

const SymbolsTable: React.FC<symbolsTableType> = ({ columns, rows }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        onCellClick={(e) => console.log(e.row)}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default SymbolsTable;
