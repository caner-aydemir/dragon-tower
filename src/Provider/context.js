import React, { createContext, useState, useEffect } from "react";
import dragonEgg from "../components/icon/dragonEgg.svg";
import dragon from "../components/icon/dragon.svg";
export const StateContext = createContext();
export const StateProvider = ({ children }) => {
    const [demoCoin, setDemoCoin] = useState(10000)
    const [selectMode, setSelectMode] = useState("Manual")
    const [betAmount, setBetAmount] = useState(0)
    const [isStart, setIsStart] = useState(false)
    const [gameOver, setGameOver] = useState(false);
    const [maxWinModal, setMaxWinModal] = useState(false);
    const [gameDifficulty, setGameDifficulty] = useState({
        EASY: 'Easy',
        MEDIUM: 'Medium',
        HARD: 'Hard',
    });
    const [selectedDifficultly, setSelectedDifficulty] = useState(gameDifficulty.EASY)

    const [refreshTable , setRefreshTable] = useState(false)
    const [multiplierChain, setMultiplierChain] = useState(1);
    const [autoMode, setAutoMode] = useState(false);

    const [selected, setSelected] = useState({});
    const [numberOfBets, setNumberOfBets] = useState(0);
    const [currentBet, setCurrentBet] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0)
    const rows = 9;
    const columns = 4;
    const [tableData, setTableData] = useState([]);
    const [openSettings , setOpenSettings] = useState(true)
    const [numberOfBetsError , setNumberOfBetsError] = useState(false)
    const [autoModeMultiWin,setAutoModeMultiWin] = useState(0)
    const selectCol = async (rowIndex, colIndex, cell, multiplier) => {
        if (!isStart || isInvalidSelection(rowIndex)) return;

        await updateSelected(rowIndex, colIndex);

        if(rowIndex === tableData.length - 1)
        {
            setDemoCoin((prev) => prev - betAmount);
        }

        if (cell === dragon) {
            await handleGameOver(rowIndex);
        } else {
            updateMultiplierChain(multiplier);

            if (isFirstRow(rowIndex)) {
                await handleFirstRowSelection();
            }
        }
    };

    const isInvalidSelection = (rowIndex) => {
        return (rowIndex !== 8 && selected[rowIndex + 1] === undefined) || selected[rowIndex];
    };

    const updateSelected = async (rowIndex, colIndex) => {
        await setSelected((prev) => ({
            ...prev,
            [rowIndex]: colIndex,
        }));
    };
    const handleGameOver = async (rowIndex) => {
        if (selectMode === "Manual") {
            endManualGame(rowIndex);
        } else if (selectMode === "Auto") {
            await handleAutoMode();
        }
    };
    const endManualGame = (rowIndex) => {
        const earnings = betAmount * multiplierChain;
        setGameOver(true);
        setDemoCoin((prev) => prev + earnings);
        if(rowIndex === tableData.length - 1){
            setMultiplierChain(0);

        }
    };

    const handleAutoMode = async () => {
        setCurrentBet((prevState) => prevState + 1);

        if (currentBet < numberOfBets -1) {
            await resetForNextAutoBet();
        } else {
            endAutoModeGame();
        }
    };

    const resetForNextAutoBet = async () => {
        await setSelected({});
        setMultiplierChain(1);
        const earnings = betAmount * multiplierChain;
        setAutoModeMultiWin((prevState) => prevState + earnings);
    };

    const endAutoModeGame = () => {
        setIsStart(false);
        setAutoMode(false);
        setGameOver(true);
        setDemoCoin((prev) => prev + autoModeMultiWin);
    };

    const updateMultiplierChain = (multiplier) => {
        setMultiplierChain((prev) => prev * multiplier);
    };

    const isFirstRow = (rowIndex) => {
        return rowIndex === 0;
    };

    const handleFirstRowSelection = async () => {
        setMaxWinModal(!maxWinModal);
        const earnings = betAmount * multiplierChain;
        const maxWinMultiplier = getMaxWinMultiplier();
        setAutoModeMultiWin(earnings * maxWinMultiplier);
        setDemoCoin((prev) => prev + earnings * maxWinMultiplier);
    };

    const getMaxWinMultiplier = () => {
        switch (selectedDifficultly) {
            case "Easy":
                return 5;
            case "Medium":
                return 49;
            case "High":
                return 99;
            default:
                return 1;
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
            selectCol,selected,setSelected,openSettings , setOpenSettings,
            numberOfBetsError,
            setNumberOfBetsError,autoModeMultiWin,setAutoModeMultiWin
        }}>
            {children}
        </StateContext.Provider>
    )
}
