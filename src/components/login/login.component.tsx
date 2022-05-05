import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

import { analyzeRes } from "./login.helper";
import { IErrorInterface, IRes } from "../../types/interfaces/res.interface";
import { IAnalyzeRes } from "../../types/interfaces/analyze-res.interface";
import Snack from "../snack/snack.component";
import { fetchDynamicAPI } from "../../utils/fetch.util";
import Loader from "../loader/loader.component";
import { symbolURL } from "../../types/constants/constants";

const Login = () => {
  const [symbol, setSymbol] = React.useState<string | null>(null);
  const [errorAnalizer, seterrorAnalizer] = React.useState<IAnalyzeRes | null>(
    null
  );
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  const [fetchingData, setFetchingData] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // set guard
    sessionStorage.setItem("isSymbol", "false");
  }, []);

  React.useEffect(() => {
    if (errorAnalizer) {
      setOpenSnack(errorAnalizer?.isError);
    }
  }, [errorAnalizer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = () => {
    if (!symbol) return;

    setFetchingData(true);
    setOpenSnack(false);

    fetchDynamicAPI(`${symbolURL}/${symbol}`)
      .then(
        (result: IErrorInterface | IRes) => {
          const { isError, msg } = analyzeRes(result);
          if (!isError) {
            sessionStorage.setItem("isSymbol", "true");
            navigate("/home", { replace: true });
          } else {
            seterrorAnalizer({ isError, msg });
          }
        },
        (error) => {
          alert(error);
          console.error("err", error);
        }
      )
      .finally(() => {
        setFetchingData(false);
      });
  };

  return (
    <>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box sx={{ mt: 1, maxWidth: 260, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="passkey"
              label="Passkey"
              name="passkey"
              autoComplete="passkey"
              autoFocus
              onChange={handleChange}
            />
            {fetchingData ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Container>
      <Snack
        msg={errorAnalizer?.msg as string}
        open={openSnack}
        setOpen={setOpenSnack}
      />
    </>
  );
};

export default Login;
