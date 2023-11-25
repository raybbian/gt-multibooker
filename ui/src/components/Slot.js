import {useEffect, useState} from "react";
import {colors, roomStatus} from "../utils/utils";
import {toast} from "react-toastify";

export default function Slot({idx, rooms, roomID, date, dateTime, dragging, setDragging, currSelectionFrom, setSelectionFrom, currSelectionTo, setSelectionTo, selections, setSelections}) {
    const [condition, setCondition] = useState(null)

    useEffect(() => {
        setCondition(roomStatus(rooms, roomID, idx, date, selections))
        if (currSelectionFrom <= idx && idx <= currSelectionTo) {
            setCondition("selected")
        }
    }, [idx, rooms, roomID, currSelectionTo, currSelectionFrom, selections]);

    function handleMouseDown() {
        if (condition === "unavailable" || condition === "booked") {
            toast.warning("These rooms are unavailable, or have already been booked!")
            return;
        }
        if (dragging) {
            return;
        }
        if (condition === "selected") {
            const updSelections = JSON.parse(JSON.stringify(selections))
            updSelections[date.toISOString()] = updSelections[date.toISOString()].filter((booking) => booking[0] > idx || booking[1] < idx)
            setSelections(updSelections)
            return;
        }

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
            <p className={"text-xs"}>
                {rooms[roomID][dateTime.toISOString()] && dateTime.toLocaleTimeString('en-GB').substring(0,5)}
            </p>
        </div>
    )
}