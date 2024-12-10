import { useEffect, useState } from 'react'
import axios from 'axios';
/** Day.js 関連の import */
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { ReserveTable } from './ReserveTable.jsx'



export const ReserveDisplay = () => {
  const url = 'http://127.0.0.1:8000/api/aaaa'

  const [reservations, setReservations] = useState([])
  const [stylist, setStylist] = useState(1);
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

  // 入れ物作成（スタイリスト）
  const stylistsArray = {}
  for (let j = 1; j < 3; j++) {
    stylistsArray[j] = new Array(10)
    for (let i = 0; i < 10; i++) {
      const custumDate = firstDate.add(i, "day").format("YYYY-MM-DD")
      // 予約時刻の配列を格納（埋まり具合はboolean）
      stylistsArray[j][custumDate] = Array.from(new Array(17)).map(() => true)
    }
  }

  const changeStylist = (value) => {
    setStylist(value)
    console.log(value)
    console.log(stylist)
  }

  // // 入れ物作成（日付）
  // const daysArray = {}
  // // 日付（親）に予約時刻（子）を格納していく
  // for (let i = 0; i < 10; i++) {
  //   const custumDate = firstDate.add(i, "day").format("YYYY-MM-DD")
  //   // console.log( typeof custumDate);
  //   // 予約時刻の配列を格納（埋まり具合はboolean）
  //   daysArray[custumDate] = Array.from(new Array(17)).map(() => true)
  //   // 変数をキーとして使用するためcustumDateを[]で囲っている
  //   // daysArray[i] = {[custumDate]:dayArray}
  // }
  // console.log(daysArray)
  // console.log(reserveObject)

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

  // for (let i = 0; i < reservations.length; i++) {
  // console.log(reservations[i].date)
  // console.log(daysArray[reservations[i].date])
  // }

  // const results = reservations.map(reservation => {
  //   // console.log(daysArray[reservation.date])
  //   for (let i = 0; i < reservation.service.duration; i++) {
  //     // console.log(daysArray[reservation.date][reservation.start_flame])
  //     daysArray[reservation.date][reservation.start_flame + i] = false

  //   }
  //   return daysArray
  // });

  const results = reservations.map(reservation => {
    // console.log(daysArray[reservation.date])
    for (let i = -1; i < reservation.service.duration; i++) {
      // console.log(daysArray[reservation.date][reservation.start_flame])
      stylistsArray[reservation.stylist_id][reservation.date][reservation.start_flame + i] = false

    }
    return stylistsArray
  });

  // const results2 = Object.keys(daysArray).map((date) => {

  //   return reservations.map(reservation => {
  //     // console.log(daysArray[reservation.date])
  //     for (let i = 0; i < reservation.service.duration; i++) {
  //       // console.log(daysArray[reservation.date][reservation.start_flame])
  //       daysArray[date][reservation.start_flame + i] = false

  //     }
  //     return daysArray
  //   })
  // })

  // console.log(stylistsArray)
  // console.log(results)

  return (
    <>
      {/* {reservations.map(reservation => (
        <div>
          <h3>{reservation.service.name}</h3>
          <div>{reservation.date}</div>
          <div>{reservation.start_flame}</div>
          <div>{reservation.service.duration}</div>
          <div>{reservation.publisher}</div>
          <div>{reservation.year}</div>
          <div>{reservation.genre}</div>
        </div>
      ))}

      {results.map(result => (
        <div>
          {/* <div>{result[0]}</div>
        </div>
      ))}*/}

      <label>
        スタイリストを選択：
        <select onChange={ e => changeStylist(e.target.value)}>
          <option value="1">a</option>
          <option value="2">b</option>
        </select>
      </label>
      {// array={{stylistsArray}}の方がいい説
        <ReserveTable array={stylistsArray[stylist]} today={firstDate} stylist={stylist}/>
      }
    </>
  )

}