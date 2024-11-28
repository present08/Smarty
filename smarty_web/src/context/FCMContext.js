import React, {createContext, useState, useContext} from 'react';
const FCMContext = createContext(); //Context 생성

export const FCMProvider = ({children}) => {
    const [fcmToken, setFcmToken] = useState(null);

    return (
        <FCMContext.Provider value={{fcmToken, setFcmToken}}>
            {children}
        </FCMContext.Provider>
    );
};

export const useFCM = () => useContext(FCMContext);