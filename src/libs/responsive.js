import React, {useEffect, useState} from 'react';
import { UAParser } from 'ua-parser-js';

const useIsMobileDevice = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent;
        const device = new UAParser(ua).getDevice();
        setIsMobile(device.type === 'mobile');

    }, []);


    return isMobile;

};

export default useIsMobileDevice;
