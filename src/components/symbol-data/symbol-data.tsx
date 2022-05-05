import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import { IRes } from "../../types/interfaces/res.interface";
import { getSymbolDataTableCells } from "./symbol-data.helper";
import { splitWords } from "../../utils/split-words";

type symbolData = {
  data: IRes;
};

const SymbolData: React.FC<symbolData> = ({ data }) => {
  return (
    <Table>
      <TableBody>
        {getSymbolDataTableCells(data).map((item) => {
          return (
            <TableRow key={item[0]}>
              <TableCell sx={{ minWidth: 240 }} align="left">
                <b>{splitWords(item[0])}</b>
              </TableCell>
              <TableCell sx={{ minWidth: 240 }} align="center">
                {item[1]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SymbolData;
