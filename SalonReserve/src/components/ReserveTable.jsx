import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const ReserveTable = () => {
  // 表のデータを生成
  const rows = Array.from({ length: 17 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => `R${rowIndex + 1}C${colIndex + 1}`)
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* ヘッダー */}
        <TableHead>
          <TableRow>
            {Array.from({ length: 10 }).map((_, colIndex) => (
              <TableCell key={colIndex} align="center">
                Col {colIndex + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* ボディ */}
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex} align="center">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default App;