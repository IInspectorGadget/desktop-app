import { useEffect, useRef, useState, useCallback } from "react"
import { throttle, createCord } from "../../utils/utils";
import useResize from "../../customHooks/useResize";

export default function WidgetComponent (props) {
    const {root, name, children, onMouseDown, setItemsConf, itemsConf } = props
    const conf = itemsConf[name]
    const {handlerOnMouseDown} = useResize({root, name, setItemsConf, itemsConf})



    return <>
        <div style={{"left":conf.cord.x + "px" , "top": conf.cord.y + "px", "width": conf.width + "px", "height": conf.height + "px"}}  className="component">
            <div data-name={conf.name} onMouseDown={onMouseDown} className="move">
                <div className="fullscreen"></div>
            </div>
            {children}
            <div className="resize">
                <div onMouseDown={handlerOnMouseDown} data-resizer="top" className="resizer resizer-top"></div>
                <div onMouseDown={handlerOnMouseDown} data-resizer="bottom" className="resizer resizer-bottom"></div>
                <div onMouseDown={handlerOnMouseDown} data-resizer="left" className="resizer resizer-left"></div>
                <div onMouseDown={handlerOnMouseDown} data-resizer="right" className="resizer resizer-right"></div>
            </div>
        </div>
    </>
}