import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IRes } from "../../types/interfaces/res.interface";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";
import { fetchDynamicAPI } from "../../utils/fetch.util";
import SymbolModal from "../symbol-modal/symbol-modal.component";
import SymbolsTable from "../symbols-table/symbols-table.component";
import { getCellsDef, getColsDef } from "./home.helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [symbolsList, setSymbolsList] = React.useState<IRes[] | []>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [symbolSelected, setSymbolSelected] = React.useState<string | null>(
    null
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    // add guard
    const isSymbol = JSON.parse(sessionStorage.getItem("isSymbol") as string);
    if (!isSymbol) {
      navigate("/login", { replace: true });
      return;
    }

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
