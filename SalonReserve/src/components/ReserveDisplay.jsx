import { useEffect, useState } from 'react'
import axios from 'axios';
/** Day.js 関連の import */
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { useLocation } from "react-router-dom"
import { ReserveTable } from './ReserveTable.jsx'



export const ReserveDisplay = () => {
  // Loginしたユーザーのidを受け取る
  const location = useLocation()
  const [userID, setUserID] = useState(location.state)
  // メニュー選択用
  const [service, setService] = useState(1);

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

  const serviceList = [
    "カット：￥5,000～",
    "カットトリートメント：￥8,000～",
    "カットカラー：￥10,000～",
    "カットカラートリートメント：￥12,000～",
    "カットパーマ：￥11,000～"]

  const stylistList = [
    "山田太郎",
    "佐藤花子"
  ]

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
    // console.log(stylist)
  }

  const changeService = (value) => {
    setService(value)
    console.log(value)
    // console.log(service)
  }

  // 予約表の内容をbooleanで設定
  const results = reservations.map(reservation => {
    for (let i = -1; i < reservation.service.duration; i++) {
      stylistsArray[reservation.stylist_id][reservation.date][reservation.start_flame + i] = false
    }
    return stylistsArray
  });

  return (
    <>
      <label>
        スタイリストを選択：
        <select onChange={e => changeStylist(e.target.value)}>
          <option value="1">{stylistList[0]}</option>
          <option value="2">{stylistList[1]}</option>
        </select>
        <br />
        メニューを選択：
        <select onChange={e => changeService(e.target.value)}>
          <option value="1">{serviceList[0]}</option>
          <option value="2">{serviceList[1]}</option>
          <option value="3">{serviceList[2]}</option>
          <option value="4">{serviceList[3]}</option>
          <option value="5">{serviceList[4]}</option>
        </select>
      </label>
      {// array={{stylistsArray}}の方がいい説
        <ReserveTable array={stylistsArray[stylist]} today={firstDate} stylist={stylist} stylistList={stylistList} user={userID} service={service} serviceList={serviceList}/>
      }
    </>
  )

}