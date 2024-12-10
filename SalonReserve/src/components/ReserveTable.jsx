import React from "react";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
/** Day.js 関連の import */
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

export const ReserveTable = (props) => {
  // dayjs現状使用していない
  /** NOTE: location(Japan)を設定する */
  dayjs.locale(ja);

  // propsの配列からキーとなっている日付のみ抽出
  const dateList = Object.keys(props.array)

  // 表のデータを生成
  // rowIndexとcolIndexを使用してpropsの配列からbooleanを取得
  const rows = Array.from({ length: 17 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => props.array[dateList[colIndex]][rowIndex])
  );


  // modalの開閉状態を表す、trueなら開いている、falseなら閉じている
  const [open, setOpen] = useState(false);
  const [selectedDate, setselectedDate] = useState(null);
  const [selectedTime, setselectedTime] = useState(null);

  // openをtrueにしてmodalを開く
  const handleOpen = (col, row) => {
    setselectedDate(col);
    setselectedTime(row);
    setOpen(true);
  }
  // openをfalseにしてmodalを閉じる
  const handleClose = () => {
    setselectedDate(null);
    setselectedTime(null);
    setOpen(false);
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <TableContainer component={Paper}>
        {/* {console.log(props)} */}
        <Table>
          <TableHead>
            {/* 左上スペースと列グループタイトル */}
            <TableRow>
              {/* 左上スペース (空セル) */}
              <TableCell style={{ borderBottom: "none" }} />
              <TableCell colSpan={10} align="center" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                予約画面
              </TableCell>
            </TableRow>
            {/* 列名のヘッダー行 */}
            <TableRow>
              {/* 行名のヘッダー */}
              <TableCell align="center">Row Name</TableCell>
              {dateList.map((time, colIndex) => (
                <TableCell key={colIndex} align="center" id={`col${colIndex + 1}`}>
                  {time.slice(5)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* 行名のセル */}
                {/* 時と分に分けてrowIndexから計算、分を00表示にするためslice使用 */}
                <TableCell align="center">{9 + Math.floor(rowIndex / 2)}:{('00' + rowIndex % 2 * 30).slice(-2)}</TableCell>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex} align="center" id={`${rowIndex + 1}-${colIndex + 1}`} onClick={() => handleOpen(dateList[colIndex], `${9 + Math.floor(rowIndex / 2)}:${('00' + rowIndex % 2 * 30).slice(-2)}`)}>
                    {/* cellはboolean、三項演算子 */}
                    {cell ? '〇' : '×'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>予約確認画面</h2>
          <p>予約日付：{selectedDate}</p>
          <p>予約時刻：{selectedTime}</p>
          <p>スタイリスト：{props.stylist}</p>
          <select>
            <option value="1">カット：￥5,000～</option>
            <option value="2">カットトリートメント：￥8,000～</option>
            <option value="3">カットカラー：￥10,000～</option>
            <option value="4">カットカラートリートメント：￥12,000～</option>
            <option value="5">カットパーマ：￥11,000～</option>
          </select><br /><br />
          <button>予約確定</button>
        </Box>
      </Modal>
    </div>
  );
};