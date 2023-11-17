import {useEffect, useState} from "react";

export default function Slot({rooms, dateTime}) {
    const [condition, setCondition] = useState(null)
    const colors = {
        "booked": "bg-yellow-200",
        "unavailable": "bg-slate-200",
        "available": "bg-green-200"
    }

    useEffect(() => {
        if (rooms[158445] && rooms[158445][dateTime.toISOString()] && rooms[158445][dateTime.toISOString()]) {
            setCondition(rooms[158445][dateTime.toISOString()]['booked'] ? "booked" : "available")
        } else {
            setCondition("unavailable")
        }
    }, [rooms]);

    return (
        <div className={`grid place-items-center h-12 ${colors[condition]}`}>
            {rooms[158445][dateTime.toISOString()] && dateTime.toLocaleTimeString()}
        </div>
    )
}