import { useEffect, useState } from 'react'
import axios from 'axios';
/** Day.js 関連の import */
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";



export const ReserveDisplay = () => {
  const url = 'http://127.0.0.1:8000/api/aaaa'

  const [reservations, setReservations] = useState([])

  useEffect(() => {
    getReservations();
  }, [])

  const getReservations = async () => {
    const response = await axios.get(url)
    const result = response.data
    console.log(result)

    setReservations(result)
    return result
  }

/** NOTE: location(Japan)を設定する */
dayjs.locale(ja);
// 表示される最初の日付をfirstDateとして設定
const firstDate = dayjs("2024-12-01");
// console.log(typeof firstDate);

// 日付と予約時刻（埋まり具合）は二重配列とする
// 日付の配列（親）を作成
let daysArray = new Array(10)
// console.log(daysArray)

// 予約時刻の配列を作成（埋まり具合はboolean）
let dayArray = Array.from(new Array(17)).map(()=>'true')
// console.log(dayArray)

// 日付（親）に予約時刻（子）を格納していく
for(let i = 0; i < 10; i++) {
  const custumDate = firstDate.add(i, "day").format("YYYY-MM-DD")
  // console.log(custumDate);

  // 変数をキーとして使用するためcustumDateを[]で囲っている
  daysArray[i] = {[custumDate]:dayArray}
}
console.log(daysArray)

//   const today = new Date('2024-12-31');
  // let today = new Date('2024-12-01');
  // today.setDate(today.getDate()+1)
  // console.log(today.toLocaleDateString())
  // console.log(today.getFullYear())
  // console.log(today.getMonth()+1)
  // console.log(today.getDate())

  
  // let daysArray
  // for(let i = 1; i < 11; i++) {
  //   // daysArray[i] =
  // }
  // let dayArray = new Object();
  // for(let i = 1; i < 18; i++) {
  //   dayArray[i] = "";
  // }


//   for(let i = 1; i < 11; i++) {
//     daysArray.
//   }


  return (
    <>
      {reservations.map(reservation => (
        <div>
          <h3>{reservation.service.name}</h3>
          <div>{reservation.date}</div>
          {/* <div>{reservation.publisher}</div>
          <div>{reservation.year}</div>
          <div>{reservation.genre}</div> */}
        </div>
      )
      )}
    </>
  )

}