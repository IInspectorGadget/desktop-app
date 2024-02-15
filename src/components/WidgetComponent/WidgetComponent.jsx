export default function WidgetComponent (props) {
    const {conf, children, onMouseDown } = props
    return <>
        <div style={{"left":conf.cord.x + "px" , "top": conf.cord.y + "px", "width": conf.width + "px" }}  className="component">
            <div data-name={conf.name} onMouseDown={onMouseDown} className="move">
                <div className="fullscreen"></div>
            </div>
            {children}
            <div className="resize">
                <div className="resizer resizer-top"></div>
                <div className="resizer resizer-bottom"></div>
                <div className="resizer resizer-left"></div>
                <div className="resizer resizer-right"></div>
            </div>
        </div>
    </>
}