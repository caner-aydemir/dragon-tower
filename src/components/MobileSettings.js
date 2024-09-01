import React, {useContext} from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import ManualConfig from "./DragonTower/ManualConfig";
import {StateContext} from "../Provider/context";
import Config from "./Config";
import AutoConfig from "./DragonTower/AutoConfig";

const MyComponent = () => {
    const mode = ["Manual", "Auto"]
    const {openSettings,setOpenSettings,demoCoin,selectMode, setSelectMode} = useContext(StateContext)
    console.log("selectMode" , selectMode)
    return (
       <div>
           <Button
               className="text-lg"
               startContent={<IoSettingsOutline />}
               onClick={() => setOpenSettings(!openSettings)}
               variant="faded"
           >
               Settings
           </Button>

           <div className={` ${openSettings && "hidden"} z-10 absolute  flex items-center justify-center left-0 right-0 z-10 `}>
                   <div className="bg-gray-800 w-3/4 rounded-2xl p-3  my-2">

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
                   </div>
       </div>
    );
};

export default MyComponent;
