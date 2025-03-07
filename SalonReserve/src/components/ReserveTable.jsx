import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
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
import { JudgeReserve } from './JudgeReserve.jsx'
import styles from './styles.module.css'

export const ReserveTable = (props) => {
  // dayjs現状使用していない
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
  // form送信用変数
  const [selectedService, setSelectedService] = useState({
    user_id:props.user,
    stylist_id:props.stylist,
    service_id:props.service,
    date:"",
    start_flame:"",
    end_flame:"", // サービスから出すのかどうするのか未定
  });

  // openをtrueにしてmodalを開く
  // 引数にcolIndexとrowIndex追加
  const handleOpen = (col, row, colIndex, rowIndex) => {
    setselectedDate(col);
    setselectedTime(row);
    // console.log(selectedService.user_id)

    // ここでselectedServiceに各要素を格納
    // setSelectedService((prev)=> ({
    //   ...prev,
    //   ["date"]:col,
    //   ["start_flame"]:rowIndex,
    // }));

    setSelectedService((prev) => {
      const updatedService = { 
        ...prev, 
        // 日付をdate型としたとき
        ["date"]: col,
        ["start_flame"]: rowIndex 
      };
      // console.log("更新後の selectedService:", updatedService); // デバッグ用
      return updatedService;
    });

    console.log(selectedService)
    setOpen(true);
  }

  useEffect(() => {
    console.log("現在の selectedService:", selectedService);
  }, [selectedService]);

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


  const handleSelectChange = (e) => {
    setSelectedService(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.get('http://localhost:8000/sanctum/csrf-cookie');

      console.log(selectedService)
      const response = await axios.post("http://localhost:8000/api/reservations", {
        selectedService, // 選択された値を送信
      } ,{
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
});

      if (response.status === 200) {
        alert("予約が正常に送信されました！");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("送信に失敗しました。");
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        {/* {console.log(props)} */}
        <Table>
          <TableHead>
            {/* 左上スペースと列グループタイトル */}
            {/*
            <TableRow>
              <TableCell style={{ borderBottom: "none" }} />
              <TableCell colSpan={10} align="center" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                予約表
              </TableCell>
            </TableRow>
            */}
            {/* 列名のヘッダー行 */}
            <TableRow>
              {/* 行名のヘッダー */}
              <TableCell align="center"></TableCell>
              {dateList.map((time, colIndex) => (
                <TableCell key={colIndex} align="center" id={`col${colIndex + 1}`}>
                  {time.slice(5)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={{
                backgroundColor: rowIndex % 2 === 1 ? "white" : "#f5f5f5", // 偶数:白, 奇数:グレー
              }}>
                {/* 行名のセル */}
                {/* 時と分に分けてrowIndexから計算、分を00表示にするためslice使用 */}
                <TableCell align="center">{9 + Math.floor(rowIndex / 2)}:{('00' + rowIndex % 2 * 30).slice(-2)}</TableCell>
                {row.map((cell, colIndex) => {
                  // 次枠以降の値を取得
                  const under1 = rows[rowIndex+1]?.[colIndex] ?? false;
                  const under2 = rows[rowIndex+2]?.[colIndex] ?? false;
                  return (
                  <TableCell key={colIndex} align="center" id={`${rowIndex + 1}-${colIndex + 1}`} onClick={() => handleOpen(dateList[colIndex], `${9 + Math.floor(rowIndex / 2)}:${('00' + rowIndex % 2 * 30).slice(-2)}`, colIndex, rowIndex)}>
                    {/* cell内容判定用コンポーネント */}
                    <JudgeReserve cell={cell} under1={under1} under2={under2} rowIndex={rowIndex} service={props.service}/>
                  </TableCell>
                )})}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <form onSubmit={handleSubmit}>
            <h2>予約確認画面</h2>
            <p>予約日付：{selectedDate}</p>
            <p>予約時刻：{selectedTime}</p>
            <p>スタイリスト：{props.stylistList[props.stylist-1]}</p>
            <p>メニュー：{props.serviceList[props.service-1]}</p>
            <br /><br />
            <button>予約確定</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};