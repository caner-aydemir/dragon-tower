import React, { useContext } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { StateContext } from '../../Provider/context';
import dragon from "../icon/dragon.svg"
import useIsMobileDevice from "../../libs/responsive";


const GameOverModal = () => {
    const { gameOver, setGameOver, setIsStart ,demoCoin,
        multiplierChain, setMultiplierChain,openSettings,setOpenSettings,
        autoMode,setAutoMode,selected, setSelected,
        setDemoCoin,betAmount,totalEarnings,
        setTotalEarnings,
        refreshTable,setRefreshTable} = useContext(StateContext)

    const isMobile = useIsMobileDevice();
    console.log("isMobile" , isMobile)
    const earnings = betAmount * multiplierChain;
    const close = () => {
        setIsStart(false)
        setSelected([])
        setGameOver(!gameOver)
        setTotalEarnings((prev) => prev + earnings);
        setDemoCoin((prev) => prev + earnings);
        setMultiplierChain(1)
        setTotalEarnings(0)
        setOpenSettings(!openSettings)

    }


    const placementSettings = isMobile ? "center" :"top"
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
                            <img src={dragon}  className={"w-32 h-32"} alt="dragon"/>
                        </ModalHeader>
                        <ModalBody>
                            <p className={"text-center text-xl text-red-600 font-bold"}>Game Over</p>
                            <p className={"text-center text-2xl text-green-500 font-extrabold"}>
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