import { useState } from "react";

export default function useLocalStorage(name, defaultValue){
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(name)) || defaultValue)

    const setStorage = (newValue) =>{
        setValue(() => {
            localStorage.setItem(name, JSON.stringify(newValue))
            return newValue
        });
    }

    return [value, setStorage]
}