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
        EXPERT: 'Expert',
        MASTER: 'Master',
    });
    const [timeLeft, setTimeLeft] = useState(30)
    const [selectedDifficultly, setSelectedDifficulty] = useState(gameDifficulty.EASY)

    const [refreshTable, setRefreshTable] = useState(false)
    const [multiplierChain, setMultiplierChain] = useState(1);
    const [autoMode, setAutoMode] = useState(false);

    const [selected, setSelected] = useState({});
    const [numberOfBets, setNumberOfBets] = useState(0);
    const [currentBet, setCurrentBet] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0)
    const rows = 9;
    const columns = 4;
    const [tableData, setTableData] = useState([]);
    const [openSettings, setOpenSettings] = useState(true)
    const [numberOfBetsError, setNumberOfBetsError] = useState(false)
    const [autoModeMultiWin, setAutoModeMultiWin] = useState(0)
    const [row, setRow] = useState(0)
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        if (isStart) {
            let mc = parseFloat(multiplierChain.toFixed(2))
            localStorage.setItem('gameState', JSON.stringify({
                selected,
                betAmount,
                tableData,
                demoCoin,
                mc,
                totalEarnings,
                isStart,
            }));
        }
    }, [selected, tableData, multiplierChain, totalEarnings, betAmount, isStart]);

    useEffect(() => {
        const savedGameState = localStorage.getItem('gameState');
        if (savedGameState) {
            const { selected, tableData, mc, totalEarnings, isStart, betAmount } = JSON.parse(savedGameState);
            setSelected(selected);
            setTableData(tableData);
            setBetAmount(betAmount)
            setMultiplierChain(mc)
            setTotalEarnings(totalEarnings);
            setIsStart(isStart || true);  // Oyun başlasın
        }
    }, []);




    useEffect(() => {

        const storedDemoCoin = localStorage.getItem('demoCoin');
        const storedOpenSettings = localStorage.getItem('openSettings');
        const storedRowIndex = localStorage.getItem("row")
        const storedSelectMode = localStorage.getItem("selectMode")

        if (storedSelectMode) {
            setSelectMode(storedSelectMode)
        }
        if (storedRowIndex) {
            setRow(Number(storedRowIndex))
        }
        if (storedDemoCoin) {
            setDemoCoin(parseInt(storedDemoCoin, 10));
        }
        else setDemoCoin(10000)

        if (storedOpenSettings) {
            const value = storedOpenSettings === "true" ? true : false
            setOpenSettings(value)
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('demoCoin', demoCoin);
        localStorage.setItem('openSettings', openSettings);
        localStorage.setItem("selectMode", selectMode)


    }, [demoCoin, openSettings, selectMode]);

    useEffect(() => {
        if (isStart && selectMode === "Auto") {
            let mc = parseFloat(multiplierChain.toFixed(2))
            localStorage.setItem('AutoModeGameState', JSON.stringify({
                selected,
                betAmount,
                currentBet,
                autoMode,
                tableData,
                demoCoin,
                numberOfBets,
                mc,
                totalEarnings,
                isStart,

            }));
        }
    }, [selected,
        numberOfBets,
        tableData,
        demoCoin,
        currentBet,
        multiplierChain,
        totalEarnings,
        isStart,
        autoMode
    ]);


    useEffect(() => {
        const savedAutoModeState = localStorage.getItem('AutoModeGameState');
        if (savedAutoModeState) {
            setAutoMode(true)
            const {
                autoMode,
                tableData,
                currentBet,
                numberOfBets,
                mc,
                selected
            } = JSON.parse(savedAutoModeState);


            setTableData(tableData);
            setMultiplierChain(mc);
            setSelected(selected);
            setCurrentBet(Number(currentBet))
            setNumberOfBets(Number(numberOfBets))
            setAutoMode(true)
            // Eğer currentBet, numberOfBets'ten küçükse auto mode'u başlat
            if (Number(currentBet) < Number(numberOfBets)) {
                // setIsStart(true);  // Oyunu başlatıyoruz
                playAutoMode();  // Auto mode tekrar başlasın
            } else {
                endAutoModeGame();  // Oyun bitmişse auto mode sonlansın
            }
        }
    }, []);  // Komponent ilk kez yüklendiğinde çalışır


    const selectCol = async (rowIndex, colIndex, cell, multiplier) => {
        if (!isStart || isInvalidSelection(rowIndex)) return;
        await updateSelected(rowIndex, colIndex); // Seçilen sütunu güncelle
        if (rowIndex === tableData.length - 1) {
            setDemoCoin((prev) => prev - betAmount); // Son satırdaysak demo paradan eksilt
        }

        if (cell === dragon) {
            await handleGameOver(rowIndex);
        } else {
            const earnings = betAmount * multiplierChain;
            setTotalEarnings((prev) => prev + earnings)
            updateMultiplierChain(multiplier); // Multiplier'ı güncelle

            if (isFirstRow(rowIndex)) {
                await handleFirstRowSelection();
            }
        }
    };


    const playAutoMode = async () => {
        // rowIndex'i localStorage'dan aldığınız row değerinden başlatıyoruz
        for (let rowIndex = 0; rowIndex < tableData?.table?.length; rowIndex++) {
            await localStorage.setItem("row", rowIndex)
            const getRow = await localStorage.getItem("row")
            // Eğer mevcut bahis, toplam bahisten büyükse döngüyü durdur.
            if (Number(currentBet) >= Number(numberOfBets)) {
                endAutoModeGame();
                break;
            }

            const columns = tableData.table[rowIndex].length;  // Satırdaki sütun sayısı
            const colIndex = Math.floor(Math.random() * columns);  // Rastgele bir sütun seçilir
            const selectedCell = tableData.table[rowIndex][colIndex];

            // 1 saniye gecikmeli sütun seçimi yapılır
            await selectCol(rowIndex, colIndex, selectedCell, tableData.multiplier);

            // Her seferinde row değerini hem localStorage'a hem state'e kaydediyoruz.
            // State'i de güncelle
        }
    };

    const isInvalidSelection = (rowIndex) => {
        if (rowIndex === 8 && selectMode === "Manual") {
            setDemoCoin((prev) => prev - betAmount)
        }
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
        let earnings;
        if (rowIndex !== 8) earnings = betAmount * multiplierChain;
        else earnings = 0
        setTotalEarnings((prev) => prev + earnings); // Kazancı totalEarnings'e ekle
        setDemoCoin((prev) => prev + earnings);
        setIsStart(false);
        setSelected({});
        setGameOver(true);

        if (rowIndex === tableData.length - 1) {
            setMultiplierChain(1);

        }
    };

    const handleAutoMode = async () => {
        setCurrentBet((prevState) => prevState + 1);

        if (currentBet < numberOfBets - 1) {
            setDemoCoin((prev) => prev - betAmount)
            await resetForNextAutoBet();
        } else {
            endAutoModeGame();
        }
    };

    const resetForNextAutoBet = async () => {
        await setSelected({});
        setMultiplierChain(1);
        setRow(0)
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
        endManualGame()
    };

    const getMaxWinMultiplier = () => {
        switch (selectedDifficultly) {
            case "Easy":
                return 5;
            case "Medium":
                return 20;
            case "High":
                return 49;
            case "Expert":
                return 60;
            case "Master":
                return 90;
            default:
                return 1;
        }
    };




    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };




    const generateRandomRow = (selectedDifficulty) => {
        let numYumurtas, numDragons, multiplier, rows = 9, columns; // Satır sayısı her zaman 9

        switch (selectedDifficulty) {
            case gameDifficulty.EASY:
                columns = 4; // 9x4 matris
                numYumurtas = 3;
                numDragons = 1;
                multiplier = 1.31;
                break;
            case gameDifficulty.MEDIUM:
                columns = 3; // 9x3 matris
                numYumurtas = 1;
                numDragons = 2;
                multiplier = 1.47;
                break;
            case gameDifficulty.HARD:
                columns = 2; // 9x2 matris
                numYumurtas = 1;
                numDragons = 1;
                multiplier = 1.96;
                break;
            case gameDifficulty.EXPERT:
                columns = 3; // 9x3 matris
                numYumurtas = 1;
                numDragons = 2;
                multiplier = 2.94;
                break;
            case gameDifficulty.MASTER:
                columns = 4; // 9x4 matris
                numYumurtas = 1;
                numDragons = 3;
                multiplier = 3.92;
                break;
            default:
                columns = 4; // Varsayılan mod: 9x4 matris
                numYumurtas = 3;
                numDragons = 1;
                multiplier = 1.31;
        }

        // Matrisin her satırı için:
        const table = Array.from({ length: rows }, () => {
            // Yumurtaları ve ejderhaları yerleştiriyoruz
            const row = Array(numYumurtas).fill(dragonEgg).concat(Array(numDragons).fill(dragon));

            // Sütun sayısını dolduruyoruz, sadece 2 veya 3 sütuna göre tamamlanıyor
            const fullRow = row.concat(Array(columns - row.length).fill(null));

            // Hücreleri karıştırıyoruz
            return shuffleArray(fullRow);
        });

        // Tablo ve multiplier'ı birlikte döndürüyoruz
        return { table, multiplier };
    };






    return (
        <StateContext.Provider value={{
            demoCoin, setDemoCoin, selectMode, setSelectMode, betAmount, setBetAmount, isStart, setIsStart, selectedDifficultly,
            setSelectedDifficulty,
            gameDifficulty, setGameDifficulty,
            gameOver, setGameOver,
            totalEarnings, setTotalEarnings,
            multiplierChain, setMultiplierChain,
            maxWinModal, setMaxWinModal, refreshTable, setRefreshTable
            , playAutoMode, autoMode, setAutoMode,
            tableData, setTableData, generateRandomRow,
            numberOfBets, setNumberOfBets,
            currentBet, setCurrentBet,
            selectCol, selected, setSelected, openSettings, setOpenSettings,
            numberOfBetsError,
            setNumberOfBetsError, autoModeMultiWin, setAutoModeMultiWin
        }}>
            {children}
        </StateContext.Provider>
    )
}
