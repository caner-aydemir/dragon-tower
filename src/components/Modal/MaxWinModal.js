import React, { useContext } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { StateContext } from '../../Provider/context';
import { GiGlassCelebration } from "react-icons/gi";
import useIsMobileDevice from "../../libs/responsive";


const MaxWinModal = () => {
    const { setIsStart,
        multiplierChain, setMultiplierChain, setOpenSettings,
        openSettings, setSelected, setDemoCoin, betAmount, selectedDifficultly,
        setTotalEarnings, maxWinModal, setMaxWinModal,
        autoModeMultiWin, selectMode, setAutoMode,
        setCurrentBet,
        setNumberOfBets
    } = useContext(StateContext)
    const isMobile = useIsMobileDevice();

    let earnings = betAmount * multiplierChain;
    const close = () => {
        setIsStart(false);
        setSelected([]);
        setMaxWinModal(false);
        setTotalEarnings((prev) => prev + earnings);
        setDemoCoin((prev) => prev + earnings);
        setMultiplierChain(1);
        setTotalEarnings(0);
        setOpenSettings(false);
        setAutoMode(false);
        setCurrentBet(0);
        setNumberOfBets(0);
        setOpenSettings(!openSettings)
        localStorage.removeItem('gameState');
        localStorage.removeItem('AutoModeGameState');
    }
    const placementSettings = isMobile ? "center" : "top"

    return (
        <Modal
            size="xs"
            isOpen={maxWinModal}
            onClose={close}
            placement={placementSettings}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex justify-center">
                            <GiGlassCelebration className={"w-32 h-32 text-purple-700"} />
                        </ModalHeader>
                        <ModalBody>
                            <p className={"text-center text-3xl text-green-500 font-bold"}>Congratulations</p>
                            <p className={"text-center  text-2xl text-green-500 font-bold"}>Max Win
                                {selectedDifficultly === "Easy" && <p className={"text-center text-2xl"}>5X</p>}
                                {selectedDifficultly === "Medium" && <p className={"text-center text-2xl"}>49X</p>}
                                {selectedDifficultly === "Hard" && <p className={"text-center text-2xl"}>99X</p>}
                            </p>

                            {selectMode === "Auto" ?
                                <p className={"text-center text-4xl animate-bounce text-green-500 font-extrabold"}>
                                    {Math.floor(autoModeMultiWin)}$
                                </p>
                                :
                                <p className={"text-center text-4xl animate-bounce text-green-500 font-extrabold"}>
                                    {Math.floor(earnings)}$
                                </p>
                            }

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={close}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default MaxWinModal