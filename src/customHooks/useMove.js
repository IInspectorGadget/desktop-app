import { useState, useRef, useCallback, useEffect } from "react";
import { throttle, createCord } from "../utils/utils";
const DURATION = 50

export default function useMove(itemsCord, setItemsCord) {
    const [cord, setCord] = useState(createCord(null, null))
    const [target, setTarget] = useState(null)

    const offset = useRef(null)
    const startCursorPosition = useRef(null)
    const ref = useRef(null)

    useEffect(() => {
        if (target) {
            setItemsCord({
                ...itemsCord,
                [target]: {
                    ...itemsCord[target],
                    name: target,
                    cord: createCord(cord.x, cord.y),
                }
            })
        }
    }, [cord])

    useEffect(() => {
        if (target) {
            ref.current.addEventListener('mousemove', move)
            offset.current = createCord(
                startCursorPosition.current.x - ref.current.querySelector(`[data-name=${target}]`).getBoundingClientRect().left,
                startCursorPosition.current.y - ref.current.querySelector(`[data-name=${target}]`).getBoundingClientRect().top,
            )
        }
        return () => {
            ref.current.removeEventListener('mousemove', move)
        }
    }, [target])

    const move = useCallback(throttle((e) => {
        setCord(createCord(e.clientX - offset.current.x, e.clientY - offset.current.y))
    }, DURATION), [target])

    const startCapture = (e) => {
        e.preventDefault();
        startCursorPosition.current = createCord(e.clientX, e.clientY)
        const currentTarget = e.currentTarget
        setTarget(currentTarget.getAttribute("data-name"))
    }

    const endCapture = (e) => {
        e.preventDefault();
        setTarget(() => null)
    }

    return { itemsCord, startCapture, endCapture, ref }

}