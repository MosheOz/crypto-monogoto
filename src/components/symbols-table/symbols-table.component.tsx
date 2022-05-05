import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";

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