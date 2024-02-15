import { useEffect, useRef, useState, useCallback } from "react"
import { throttle, createCord } from "../../utils/utils";

export default function WidgetComponent (props) {
    const {root, name, children, onMouseDown, setItemsConf, itemsConf } = props

    const conf = itemsConf[name]

    const [mousePos, setMousePos] = useState(createCord(null,null))
    const [currentResizer, setCurrentResizer] = useState(null);
    const resize = useRef(null);

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



    return <>
        <div style={{"left":conf.cord.x + "px" , "top": conf.cord.y + "px", "width": conf.width + "px", "height": conf.height + "px"}}  className="component">
            <div data-name={conf.name} onMouseDown={onMouseDown} className="move">
                <div className="fullscreen"></div>
            </div>
            {children}
            <div ref={resize} className="resize">
                <div onMouseDown={handlerOnMouseDown} data-resizer="top" className="resizer resizer-top"></div>
                <div onMouseDown={handlerOnMouseDown} data-resizer="bottom" className="resizer resizer-bottom"></div>
                <div onMouseDown={handlerOnMouseDown} data-resizer="left" className="resizer resizer-left"></div>
                <div onMouseDown={handlerOnMouseDown} data-resizer="right" className="resizer resizer-right"></div>
            </div>
        </div>
    </>
}