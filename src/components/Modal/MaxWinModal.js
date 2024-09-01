import React, { useContext } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { StateContext } from '../../Provider/context';
import dragon from "../icon/dragon.svg"
import { GiGlassCelebration } from "react-icons/gi";


const GameOverModal = () => {
    const { gameOver, setGameOver, setIsStart ,demoCoin,
        multiplierChain, setMultiplierChain,selected,setOpenSettings,
        openSettings, setSelected,setDemoCoin,betAmount,selectedDifficultly,totalEarnings, setTotalEarnings,maxWinModal,gameDifficulty,setMaxWinModal} = useContext(StateContext)
    let earnings = betAmount * multiplierChain;
    let maxWinMultiplier;
    const close = () => {
        if(selectedDifficultly === "Easy")
        {
            maxWinMultiplier = 5
        }
        if(selectedDifficultly === "Medium")
        {
            maxWinMultiplier = 49

        }
        if(selectedDifficultly === "Medium")
        {
            maxWinMultiplier = 99

        }
        setIsStart(false)
        setSelected([])
        setMaxWinModal(!maxWinModal)
        setTotalEarnings((prev) => prev + earnings*maxWinMultiplier);
        setDemoCoin((prev) => prev + earnings*maxWinMultiplier);
        setMultiplierChain(1)
        setTotalEarnings(0)
        setOpenSettings(!openSettings)

    }
    return (
        <Modal
            size="xs"
            isOpen={maxWinModal}
            onClose={close}
            placement="top"
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex justify-center">
                            <GiGlassCelebration className={"w-32 h-32 text-purple-700"}/>
                        </ModalHeader>
                        <ModalBody>
                            <p className={"text-center text-3xl text-green-500 font-bold"}>Congratulations</p>
                            <p className={"text-center  text-2xl text-green-500 font-bold"}>Max Win
                                {selectedDifficultly === "Easy" && <p className={"text-center text-2xl"}>5X</p>}
                                {selectedDifficultly === "Medium" && <p className={"text-center text-2xl"}>49X</p>}
                                {selectedDifficultly === "Hard" && <p className={"text-center text-2xl"}>99X</p>}
                            </p>


                            <p className={"text-center text-4xl animate-bounce text-green-500 font-extrabold"}>
                              {Math.floor(earnings)}$
                            </p>
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

export default GameOverModal