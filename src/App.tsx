import React from "react";
import Login from "./components/login/login.component";
import Home from "./components/home/home.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
