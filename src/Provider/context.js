import React, { createContext, useState, useEffect } from "react";



export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [demoCoin, setDemoCoin] = useState(10000)
    const [selectMode, setSelectMode] = useState("Manual")
    return (
        <StateContext.Provider value={{ demoCoin, setDemoCoin, selectMode, setSelectMode }}>
            {children}
        </StateContext.Provider>
    )
}
