import * as React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";

type symbolsTableType = {
  columns: GridColDef[];
  rows: GridCellDef[];
  onCellClick: (e: GridCellParams<any, any, any>) => void;
};

const SymbolsTable: React.FC<symbolsTableType> = ({
  columns,
  rows,
  onCellClick,
}) => {
  return (
    <div style={{ height: 632, width: "100%" }}>
      <DataGrid
        onCellClick={onCellClick}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default SymbolsTable;
