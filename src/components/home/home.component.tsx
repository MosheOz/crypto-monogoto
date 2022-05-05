import React from "react";
import { useNavigate } from "react-router-dom";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import { IRes } from "../../types/interfaces/res.interface";
import { GridCellDef } from "../../types/interfaces/symbol-table.interface";
import { fetchDynamicAPI } from "../../utils/fetch.util";
import SymbolModal from "../symbol-modal/symbol-modal.component";
import SymbolsTable from "../symbols-table/symbols-table.component";
import { getCellsDef, getColsDef } from "./home.helper";
import Loader from "../loader/loader.component";
import { Box } from "@mui/system";
import { symbolsListURL } from "../../types/constants/constants";

const Home = () => {
  const [symbolsList, setSymbolsList] = React.useState<IRes[] | []>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [symbolSelected, setSymbolSelected] = React.useState<string | null>(
    null
  );
  const [fetchingData, setFetchingData] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    // add guard
    const isSymbol = JSON.parse(sessionStorage.getItem("isSymbol") as string);
    if (!isSymbol) {
      navigate("/login", { replace: true });
      return;
    }

    setFetchingData(true);

    fetchDynamicAPI(symbolsListURL)
      .then(
        (result: IRes[]) => {
          setSymbolsList(result);
        },
        (error) => {
          console.log("err", error);
        }
      )
      .finally(() => {
        setFetchingData(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Avatar sx={{ marginBottom: 3, bgcolor: "secondary.main" }}>
        <CurrencyBitcoinIcon />
      </Avatar>
      {fetchingData ? (
        <Box
          sx={{
            marginTop: 15,
          }}
        >
          <Loader />
        </Box>
      ) : (
        <SymbolsTable rows={rows} columns={columns} onCellClick={onCellClick} />
      )}
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
