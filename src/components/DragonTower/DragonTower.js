import React, { useEffect, useState, useContext } from 'react'
import { Chip } from '@nextui-org/react'
import dolarIcon from "../icon/dolarIcon.svg"
import { StateContext } from '../../Provider/context'
import Game from './Game'
import MobileSettings from "../MobileSettings";
import Config from "../Config";
import useIsMobileDevice from "../../libs/responsive";


const DragonTower = () => {
    const isMobile = useIsMobileDevice();
    const { demoCoin, selectMode, numberOfBets, currentBet, multiplierChain } = useContext(StateContext)



    return (

        <div className=' w-2/3 flex  xs:w-screen  xs:p-2 flex-col items-center h-full space-y-10  xs:space-y-2 ' >
            <div className='flex flex-col gap-x-3 mx-auto text-2xl'>
                <Chip size='lg' color="warning" variant="light" className='font-sans text-xl' endContent={<img src={dolarIcon} alt='Dollar İcon' />}>Demo Coin : {Math.floor(demoCoin)}  </Chip>
                {(isMobile && multiplierChain !== 1) &&
                    <p className='text-sm mx-auto underline'>Multipler : {parseFloat(multiplierChain.toFixed(2))
                    }</p>
                }

                {selectMode === "Auto" && !isMobile
                    &&
                    <>{Number(numberOfBets) > 0 && <p className={"text-center"}>Remainig : {Number(numberOfBets) - Number(currentBet)}</p>}</>
                }
            </div>

            <div className={"hidden xs:flex"}>
                <MobileSettings />
            </div>
            <div className='w-full flex border-4 rounded-r-3xl xs:border-none border-gray-600 h-full   '>
                <div className={"xs:hidden w-1/4"}>
                    <Config />
                </div>
                <div className=' flex h-full flex-col  xs:justify-start  justify-center w-3/4 xs:w-full'>
                    <Game />
                </div>
            </div>
        </div>
    )
}

export default DragonTower