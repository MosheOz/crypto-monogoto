import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";
import SymbolsTable from "../symbols-table/symbols-table.component";
import { getColsDef } from "./home.helper";

const Home = () => {
  const columns: GridColDef[] = getColsDef();
  const rows: GridCellDef[] = [];

  return <SymbolsTable rows={rows} columns={columns} />;
};

export default Home;
