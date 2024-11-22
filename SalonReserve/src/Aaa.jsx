import { useEffect, useState } from 'react'
import axios from 'axios';


export const Aaa = () => {
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