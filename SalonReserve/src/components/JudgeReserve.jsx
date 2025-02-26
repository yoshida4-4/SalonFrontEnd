import React from "react";
import { useEffect, useState } from 'react'

export const JudgeReserve = (props) => {

    const cell = props.cell
    const under1 = props.under1
    const under2 = props.under2
    const rowIndex = props.rowIndex
    const service = props.service

    // let result = ""

    // useEffect(() => {
    //     console.log("a",service)
    //     result = judge(service)
    // }, [service])

    // menuID1(枠2)
    const judge1 = (cell) => {
        if(cell){
            return "〇"
        }
        return "×"
    }

    // menuID2,3,5(枠3)
    const judge2 = (cell, under1, rowIndex) => {
        if(cell && under1 && rowIndex < 16){
            return "〇"
        }
        return "×"
    }

    // menuID4(枠4)
    const judge3 = (cell, under1, under2, rowIndex) => {
        if(cell && under1 && under2 && rowIndex < 15){
            return "〇"
        }
        return "×"
    }

    const judge = (service) => {
        // console.log("judge実行")
        if(Number(service) === 1) {
            // console.log(cell)
            return judge1(cell)
        }else if(Number(service) === 2 || Number(service) === 3 || Number(service) === 5) {
            // console.log(cell)
            // console.log(under1)
            // console.log(rowIndex)
            return judge2(cell, under1, rowIndex)
        }else if(Number(service) === 4) {
            // console.log(cell, under1, under2, rowIndex)
            return judge3(cell, under1, under2, rowIndex)
        }
    }

    return (
        <>
            <>{judge(service)}</>
        </>
    )
}