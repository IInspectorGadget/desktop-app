import { useState } from "react";


function createCord(x, y) {
    return { x, y };
  }

export default function useLocalStorage({x,y}){
    const [value, setValue] = useState(x,y)

    const setCord = ({x,y}) =>{
        setValue(createCord(x,y));
    }

    return [value, setCord]
}