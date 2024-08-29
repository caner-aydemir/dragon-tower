import React, { useContext } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { StateContext } from '../../Provider/context';


const GameOverModal = ({ selected, setSelected }) => {
    const { gameOver, setGameOver, setIsStart } = useContext(StateContext)
    const close = () => {
        setIsStart(false)
        setSelected([])
        setGameOver(!gameOver)
    }
    return (
        <Modal
            size="xs"
            isOpen={gameOver}
            onClose={close}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Dragon</ModalHeader>
                        <ModalBody>

                            <p>
                                Kazancınız : 0 tl
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