import { useEffect, useRef, useState, useCallback } from "react"
import { throttle, createCord } from "../utils/utils";

export default function useResize(args){
    const {root, name, setItemsConf, itemsConf } = args

    const conf = itemsConf[name]

    const [mousePos, setMousePos] = useState(createCord(null,null))
    const [currentResizer, setCurrentResizer] = useState(null);

    useEffect(()=>{
        root.current.addEventListener("mouseup",handlerOnMouseUp)
        return () => root.current.removeEventListener("mouseup", handlerOnMouseUp)
    },[])

    useEffect(()=>{
        if(currentResizer){
            root.current.addEventListener("mousemove", move)
        }
        return ()=> {
            root.current.removeEventListener("mousemove", move)
        }
    },[currentResizer])

  
    const move = useCallback(throttle((e) => {
        const offsetX = e.clientX - mousePos.x;
        const offsetY = e.clientY - mousePos.y;
        let updateWidth = conf.width;
        let updateHeight = conf.height;
        let  updateX = conf.cord.x;
        let  updateY = conf.cord.y;
        switch(currentResizer){
            case 'left':
                updateWidth = updateWidth - offsetX;
                updateX = updateX + offsetX
                break
            case 'right':
                updateWidth = updateWidth + offsetX;
                break
            case 'top':
                updateHeight = updateHeight - offsetY;
                updateY = updateY + offsetY
                break
            case 'bottom':
                updateHeight = updateHeight + offsetY;
                break
        }
        setItemsConf({
                ...itemsConf,
                [conf.name]: {
                    ...conf,
                    cord: createCord(updateX, updateY),
                    width: updateWidth,
                    height: updateHeight,
                }
            }
        )

    }, 50), [currentResizer])

    const handlerOnMouseDown = (e) => {
        e.preventDefault()
        const current = e.currentTarget.getAttribute("data-resizer")
        setCurrentResizer(current)
        setMousePos(createCord(e.clientX, e.clientY))
    }

    const handlerOnMouseUp = (e) => {
        e.preventDefault();
        setCurrentResizer(null)
    }

    return {handlerOnMouseUp, handlerOnMouseDown}
}