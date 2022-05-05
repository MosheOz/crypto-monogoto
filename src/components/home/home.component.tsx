import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IRes } from "../../types/interfaces/res.interface";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";
import SymbolsTable from "../symbols-table/symbols-table.component";
import { getCellsDef, getColsDef } from "./home.helper";

const Home = () => {
  const [symbolsList, setSymbolsList] = React.useState<IRes[] | []>([]);

  React.useEffect(() => {
    fetch(`https://api2.binance.com/api/v3/ticker/24hr`)
      .then((res) => res.json())
      .then(
        (result: IRes[]) => {
          setSymbolsList(result);
        },
        (error) => {
          console.log("err", error);
        }
      );
  }, []);

  const columns: GridColDef[] = getColsDef();
  const rows: GridCellDef[] = getCellsDef(symbolsList);

  return <SymbolsTable rows={rows} columns={columns} />;
};

export default Home;
