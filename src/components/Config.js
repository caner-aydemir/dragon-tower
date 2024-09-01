import React, {useContext} from 'react';
import ManualConfig from "./DragonTower/ManualConfig";
import AutoConfig from "./DragonTower/AutoConfig";
import {StateContext} from "../Provider/context";

const MyComponent = () => {
    const mode = ["Manual", "Auto"]
    const { demoCoin, selectMode, setSelectMode } = useContext(StateContext)

    return (
        <div className=' w-1/4 xs:hidden h-full bg-gray-600 p-2 flex flex-col gap-y-5'>
            <div className='bg-gray-900 rounded-full flex justify-between p-2 w-full text-black '>
                {mode.map((item, index) => (
                    <button onClick={() => setSelectMode(item)} key={index} className={`${item === selectMode && " bg-gray-600"} w-1/2  flex justify-center transition duration-150  py-2 text-white  rounded-full`}>{item}</button>

                ))}
            </div>
            {selectMode === "Manual" ?
                <ManualConfig  />
                :
                <AutoConfig />
            }
        </div>
    );
};

export default MyComponent;
