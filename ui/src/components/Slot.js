import {useEffect, useState} from "react";

export default function Slot({rooms, roomID, dateTime}) {
    const [condition, setCondition] = useState(null)
    const colors = {
        "booked": "bg-yellow-200",
        "unavailable": "bg-slate-200",
        "available": "bg-green-200"
    }

    useEffect(() => {
        if (rooms[roomID] && rooms[roomID][dateTime.toISOString()] && rooms[roomID][dateTime.toISOString()]) {
            setCondition(rooms[roomID][dateTime.toISOString()]['booked'] ? "booked" : "available")
        } else {
            setCondition("unavailable")
        }
    }, [rooms, roomID]);

    return (
        <div className={`grid place-items-center ${colors[condition]}`}>
            {rooms[roomID][dateTime.toISOString()] && dateTime.toLocaleTimeString('en-GB').substring(0,5)}
        </div>
    )
}