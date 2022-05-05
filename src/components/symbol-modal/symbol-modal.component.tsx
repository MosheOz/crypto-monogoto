import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IRes } from "../../types/interfaces/res.interface";
import { fetchDynamicAPI } from "../../utils/fetch.util";
import SymbolData from "../symbol-data/symbol-data";
import { Box, Container, CssBaseline } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type symbolModalType = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  symbol: string;
};

const SymbolModal: React.FC<symbolModalType> = ({ open, setOpen, symbol }) => {
  const [symbolData, setSymbolData] = React.useState<IRes | null>(null);

  React.useEffect(() => {
    fetchDynamicAPI(`http://localhost:1880/get-symbol-data/${symbol}`).then(
      (result: IRes) => {
        setSymbolData(result);
      },
      (error) => {
        console.log("err", error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {symbol}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {symbolData && <SymbolData data={symbolData} />}
        </Box>
      </Container>
    </Dialog>
  );
};

export default SymbolModal;
