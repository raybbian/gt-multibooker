import {useEffect, useState} from "react";
import {colors, roomStatus} from "../utils/utils";

export default function Slot({idx, rooms, roomID, date, dateTime, dragging, setDragging, currSelectionFrom, setSelectionFrom, currSelectionTo, setSelectionTo, selections}) {
    const [condition, setCondition] = useState(null)

    useEffect(() => {
        setCondition(roomStatus(rooms, roomID, idx, date, selections))
        if (currSelectionFrom <= idx && idx <= currSelectionTo) {
            setCondition("selected")
        }
    }, [idx, rooms, roomID, currSelectionTo, currSelectionFrom]);

    function handleMouseDown() {
        if (condition === "unavailable" || condition === "booked" || dragging) return;
        setDragging(true)
        setSelectionFrom(idx)
        setSelectionTo(idx)
    }

    function handleMouseEnter() {
        if (!dragging) return;

        if (idx >= currSelectionFrom) {
            let upperLimit = Infinity
            for(let i = currSelectionFrom; i <= idx; i++) {
                if (roomStatus(rooms, roomID, i, date, selections) === "booked") {
                    //can only set up to previous room
                    upperLimit = i - 1;
                    break;
                }
            }
            setSelectionTo(Math.min(upperLimit, idx))
        }
    }

    return (
        <div
            className={`grid place-items-center ${colors[condition]} select-none`}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
        >
            {rooms[roomID][dateTime.toISOString()] && dateTime.toLocaleTimeString('en-GB').substring(0,5)}
        </div>
    )
}