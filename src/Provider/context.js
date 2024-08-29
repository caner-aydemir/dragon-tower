import React, { createContext, useState, useEffect } from "react";



export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [demoCoin, setDemoCoin] = useState(10000)
    const [selectMode, setSelectMode] = useState("Manual")
    const [betAmount, setBetAmount] = useState(0)
    const [isStart, setIsStart] = useState(false)
    const [difficultly, setDifficultly] = useState()
    const [gameOver, setGameOver] = useState(false);

    return (
        <StateContext.Provider value={{
            demoCoin, setDemoCoin, selectMode, setSelectMode, betAmount, setBetAmount, isStart, setIsStart, difficultly,
            setDifficultly,
            gameOver, setGameOver
        }}>
            {children}
        </StateContext.Provider>
    )
}
