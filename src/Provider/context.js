import React, { createContext, useState, useEffect } from "react";
import dragonEgg from "../components/icon/dragonEgg.svg";
import dragon from "../components/icon/dragon.svg";



export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [demoCoin, setDemoCoin] = useState(10000)
    const [selectMode, setSelectMode] = useState("Manual")
    const [betAmount, setBetAmount] = useState(0)
    const [isStart, setIsStart] = useState(false)
    const [selectedDifficultly, setSelectedDifficulty] = useState(null)
    const [gameOver, setGameOver] = useState(false);
    const [maxWinModal, setMaxWinModal] = useState(false);
    const [gameDifficulty, setGameDifficulty] = useState({
        EASY: 'Easy',
        MEDIUM: 'Medium',
        HARD: 'Hard',
    });
    const [refreshTable , setRefreshTable] = useState(false)
    const [multiplierChain, setMultiplierChain] = useState(1); // Multiplier çarpanlarını zincir halinde saklamak için state
    const [autoMode, setAutoMode] = useState(false); // Auto mode state

    const [selected, setSelected] = useState({}); // { rowIndex: colIndex }
    const [numberOfBets, setNumberOfBets] = useState(0);
    const [currentBet, setCurrentBet] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0)
    const rows = 9;
    const columns = 4;
    const [tableData, setTableData] = useState([]);
    const [openSettings , setOpenSettings] = useState(false)
    const selectCol = (rowIndex, colIndex, cell, multiplier) => {
        if (rowIndex === tableData.length - 1) {
            setDemoCoin((prev) => prev - betAmount);
        }
        if (!isStart) return;
        if (rowIndex !== 8 && selected[rowIndex + 1] === undefined) return;
        if (selected[rowIndex]) return;
        setSelected((prev) => ({
            ...prev,
            [rowIndex]: colIndex
        }));
        if (rowIndex === tableData.length - 1 && cell === dragon) {
            setAutoMode(false); // Auto mode'u durdur
            setGameOver(true);
            setMultiplierChain(0);
            return;
        }

        if (cell !== dragon) {
            setMultiplierChain((prev) => prev * multiplier);
        }


        if (cell === dragon) {
            setAutoMode(false); // Auto mode'u durdur
            setGameOver(true);
            setDemoCoin((prev) => prev + totalEarnings); // Oyun bitince kazancı demoCoine ekle
            return;
        }
        if(rowIndex === 0) {
            console.log("MAX WIN");
            setMaxWinModal(!maxWinModal);
        }

    };
    const playAutoMode = async()  => {


            for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
                const colIndex = Math.floor(Math.random() * columns);
                await selectCol(rowIndex, colIndex, tableData[rowIndex].row[colIndex], tableData[rowIndex].multiplier);
            }



    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    const generateRandomRow = (columns, selectedDifficultly) => {
        let numYumurtas, numDragons, multiplier;
        switch (selectedDifficultly) {
            case gameDifficulty.EASY:
                numYumurtas = Math.floor(columns * 0.75);
                numDragons = columns - numYumurtas;
                multiplier = 1.50;
                break;
            case gameDifficulty.MEDIUM:
                numYumurtas = Math.floor(columns / 2);
                numDragons = columns - numYumurtas;
                multiplier = 2.15;
                break;
            case gameDifficulty.HARD:
                numDragons = Math.floor(columns * 0.75);
                numYumurtas = columns - numDragons;
                multiplier = 3.0;
                break;
            default:
                numYumurtas = Math.floor(columns / 2);
                numDragons = columns - numYumurtas;
                multiplier = 1;
        }

        const row = Array.from({ length: columns }, (_, i) => {
            if (i < numYumurtas) {
                return dragonEgg;
            } else {
                return dragon;
            }
        });

        return { row: shuffleArray(row), multiplier };
    };
    return (
        <StateContext.Provider value={{
            demoCoin, setDemoCoin, selectMode, setSelectMode, betAmount, setBetAmount, isStart, setIsStart, selectedDifficultly,
            setSelectedDifficulty,
            gameDifficulty , setGameDifficulty,
            gameOver, setGameOver,
            totalEarnings, setTotalEarnings,
            multiplierChain, setMultiplierChain,
            maxWinModal, setMaxWinModal,refreshTable , setRefreshTable
           , playAutoMode,autoMode, setAutoMode,
            tableData, setTableData,generateRandomRow,
            numberOfBets, setNumberOfBets,
            currentBet, setCurrentBet,
            selectCol,selected,setSelected,openSettings , setOpenSettings
        }}>
            {children}
        </StateContext.Provider>
    )
}
