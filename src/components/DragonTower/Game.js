import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../Provider/context'; // Global state'i almak için context kullanımı
import GameOverModal from '../Modal/GameOverModal'; // Oyun bittiğinde açılan modal
import dragon from "../icon/dragon.svg"; // Ejderha ikonu
import dragonEgg from "../icon/dragonEgg.svg"; // Ejderha yumurtası ikonu
import { motion } from 'framer-motion'; // Animasyonlar için kullanılan kütüphane
import MaxWinModal from "../Modal/MaxWinModal"; // Maksimum kazanç modalı
import { Spinner } from "@nextui-org/react";

const Table = () => {
    // Global state'deki verileri ve fonksiyonları almak için context kullanımı
    const { isStart, gameOver, selectedDifficultly, currentBet, numberOfBets, refreshTable, selectCol, playAutoMode,
        selected, setTableData, tableData, generateRandomRow, autoMode, setMultiplierChain, maxWinModal } = useContext(StateContext);

    // Oyun başladığında veya tablo yenilendiğinde tabloyu oluşturur
    useEffect(() => {
        if (!isStart) {
            const tableData = generateRandomRow(selectedDifficultly); // Rastgele tablo verisi oluşturulur
            setTableData(tableData); // Tablo verisi state'e set edilir
            setMultiplierChain(1); // Oyun başladığında multiplier sıfırlanır
        }
    }, [refreshTable, isStart]); // isStart veya refreshTable değiştiğinde tabloyu yeniler

    // Otomatik modda oyunun akışını yönetir
    useEffect(() => {
        let timer;
        if (autoMode === true && !gameOver) {
            timer = setInterval(() => {
                playAutoMode();  // Otomatik oyun modu başlatılır
            }, 1000); // Her 1 saniyede bir sütun seçimi yapılır
        }
        return () => clearInterval(timer); // Temizlik işlemi: interval'i temizler
    }, [selected, autoMode, gameOver, currentBet, numberOfBets]); // Belirli değişkenler değiştiğinde yeniden çalıştırılır

    return (
        <div>
            <div className='w-1/2 xs:w-full flex justify-center items-center mx-auto h-full'>
                <div className='w-full flex flex-col p-2 gap-3 border-8 border-gray-700 shadow-2xl'>
                    {tableData && tableData.table && tableData.table.length > 0 ? (
                        // Tablo verisi varsa her satırı ve sütunu render eder
                        tableData.table.map((row, rowIndex) => (
                            <div key={rowIndex} className='w-full flex gap-2'>
                                {row.map((cell, colIndex) => {
                                    // Her hücre için buton rengi belirlenir
                                    let buttonColor = 'bg-gray-700';
                                    if (isStart) {
                                        if (rowIndex === 8 && selected[rowIndex] === undefined) {
                                            buttonColor = 'bg-green-500'; // Son satırdaki seçim yeşil yapılır
                                        } else if (selected[rowIndex] !== undefined) {
                                            buttonColor = 'bg-gray-700'; // Daha önce seçilen hücre gri yapılır
                                        } else if (selected[rowIndex + 1] !== undefined) {
                                            buttonColor = 'bg-green-500'; // Bir sonraki satırın seçimi yeşil yapılır
                                        }
                                    }

                                    return (
                                        <button
                                            disabled={!isStart || autoMode} // Oyun başlamadıysa veya otomatik moddaysa butonlar devre dışı
                                            key={colIndex}
                                            draggable={false} // Butonlar sürüklenemez
                                            onDragStart={(e) => e.preventDefault()} // Sürüklemeyi engeller
                                            onClick={() => selectCol(rowIndex, colIndex, cell, tableData.multiplier)} // Hücre seçimi
                                            className={`w-full h-12 xs:h-10 flex 
                                ${(cell === dragonEgg && selected[rowIndex] === colIndex) && "bg-slate-500 border-2 "} // Ejderha yumurtası seçildiyse buton rengi
                                ${(cell === dragon && selected[rowIndex] === colIndex) && "bg-white border-4 border-red-700 "} // Ejderha seçildiyse buton rengi
                                ${buttonColor} rounded-md items-center justify-center ${!isStart && "hover:cursor-not-allowed "}` // Genel buton stili
                                            }
                                        >
                                            <motion.img
                                                src={cell}
                                                alt="cell"
                                                onDragStart={(e) => e.preventDefault()} // Sürüklemeyi engeller
                                                className={`w-24 h-24 xs:w-16 xs:h-16  ${selected[rowIndex] !== colIndex ? '' : 'opacity-0'}`} // Seçili hücre görünümü
                                                initial={{ opacity: 0, scale: 0.8 }} // Animasyon başlangıç durumu
                                                animate={{ opacity: selected[rowIndex] !== colIndex ? 0 : 1, scale: selected[rowIndex] !== colIndex ? 1 : 0.8 }} // Animasyon ilerleyişi
                                                transition={{ duration: 0.5 }} // Animasyon süresi
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <Spinner label="Loading..." color="warning" />
                        // Tablo yüklenirken gösterilen mesaj
                    )}

                </div>
            </div>

            {/* Oyun bittiyse GameOverModal açılır */}
            {gameOver && <GameOverModal />}

            {/* Maksimum kazanç modalı açılır */}
            {maxWinModal && <MaxWinModal />}
        </div>
    );
};

export default Table;
