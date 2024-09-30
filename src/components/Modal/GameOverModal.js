import React, { useContext } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { StateContext } from '../../Provider/context';
import dragon from "../icon/dragon.svg"
import useIsMobileDevice from "../../libs/responsive";


const GameOverModal = () => {
    const { gameOver, setGameOver, setIsStart,
        multiplierChain, setMultiplierChain, openSettings, setOpenSettings,
        setAutoMode, setSelected,
        setDemoCoin, betAmount,
        setRefreshTable,
        refreshTable,
        setTotalEarnings,
        totalEarnings,
        selectMode, setCurrentBet,
        setNumberOfBets, autoModeMultiWin, } = useContext(StateContext)

    const isMobile = useIsMobileDevice();
    const earnings = betAmount * multiplierChain;
    const close = () => {

        setIsStart(false);
        setSelected({});
        setGameOver(false);
        // setTotalEarnings((prev) => prev + earnings);
        setMultiplierChain(1);

        setOpenSettings(false);
        setAutoMode(false);
        setCurrentBet(0);
        setNumberOfBets(0)
        setOpenSettings(!openSettings)
        setRefreshTable(!refreshTable)
        setTotalEarnings(0);
        localStorage.removeItem('gameState');
        localStorage.removeItem('AutoModeGameState');

    }


    const placementSettings = isMobile ? "center" : "top"
    return (
        <Modal
            size="xs"
            isOpen={gameOver}
            onClose={close}
            placement={placementSettings}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex justify-center">
                            <img src={dragon} className={"w-32 h-32"} alt="dragon" />
                        </ModalHeader>
                        <ModalBody>
                            <p className={"text-center text-xl text-red-600 font-bold"}>Game Over</p>
                            {selectMode === "Auto" ?
                                <p className={"text-center text-2xl text-green-500 font-extrabold"}>
                                    {Math.floor(autoModeMultiWin)}$
                                </p>
                                :
                                <p className={"text-center text-2xl text-green-500 font-extrabold"}>
                                    {Math.floor(totalEarnings)}$
                                </p>
                            }

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={close}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default GameOverModal
