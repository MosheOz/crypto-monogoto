import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IRes } from "../../types/interfaces/res.interface";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";
import { fetchDynamicAPI } from "../../utils/fetch.util";
import SymbolModal from "../symbol-modal/symbol-modal.component";
import SymbolsTable from "../symbols-table/symbols-table.component";
import { getCellsDef, getColsDef } from "./home.helper";

const Home = () => {
  const [symbolsList, setSymbolsList] = React.useState<IRes[] | []>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [symbolSelected, setSymbolSelected] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    fetchDynamicAPI(`https://api2.binance.com/api/v3/ticker/24hr`).then(
      (result: IRes[]) => {
        setSymbolsList(result);
      },
      (error) => {
        console.log("err", error);
      }
    );
  }, []);

  React.useEffect(() => {
    if (symbolSelected) {
      setOpenModal(true);
    }
  }, [symbolSelected]);

  const columns: GridColDef[] = getColsDef();
  const rows: GridCellDef[] = getCellsDef(symbolsList);

  const onCellClick = async (e: GridCellParams<any, any, any>) => {
    setSymbolSelected(e.row.symbol);
  };

  return (
    <>
      <SymbolsTable rows={rows} columns={columns} onCellClick={onCellClick} />
      {openModal && symbolSelected && (
        <SymbolModal
          open={openModal}
          setOpen={setOpenModal}
          symbol={symbolSelected}
        />
      )}
    </>
  );
};

export default Home;
