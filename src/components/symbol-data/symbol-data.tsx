import React from "react";
import { Table, TableCell, TableRow } from "@mui/material";

import { IRes } from "../../types/interfaces/res.interface";
import { getSymbolDataTableCells } from "./symbol-data.helper";
import { splitWords } from "../../utils/split-words";

type symbolData = {
  data: IRes;
};

const SymbolData: React.FC<symbolData> = ({ data }) => {
  return (
    <Table>
      {getSymbolDataTableCells(data).map((item) => {
        return (
          <TableRow>
            <TableCell variant="head">{splitWords(item[0])}</TableCell>
            <TableCell>{item[1]}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default SymbolData;
