import React, {useContext} from 'react';
import AutoConfig from "./DragonTower/AutoConfig";
import {StateContext} from "../Provider/context";
import Settings from "./Settings/Settings";
const MyComponent = () => {
    const mode = ["Manual", "Auto"]
    const { demoCoin, selectMode, setSelectMode,setBetAmount } = useContext(StateContext)
    const changeMode = (item)=>{
        setBetAmount(0)
        setSelectMode(item)
    }
    return (
        <div className=' w-full  h-full bg-gray-600 p-2 flex flex-col gap-y-5'>
            <div className='bg-gray-900 rounded-full flex justify-between p-2 w-full text-black '>
                {mode.map((item, index) => (
                    <button onClick={() => changeMode(item)} key={index} className={`${item === selectMode && " bg-gray-600"} w-1/2  flex justify-center transition duration-150  py-2 text-white  rounded-full`}>{item}</button>

                ))}
            </div>
            {selectMode === "Manual" ?
                <Settings/>
                :
                <AutoConfig />
            }
        </div>
    );
};

export default MyComponent;
