import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Day from "./Day";

export default function Calendar() {
    useEffect(() => {
        getRooms();
    }, [])

    const timeRef = useRef(new Date())
    const dayRef = useRef(new Date(new Date().setHours(0, 0, 0, 0)))
    const [rooms, setRooms] = useState(null);

    function getRooms() {
        // const todayString = dayRef.current.toLocaleDateString('en-CA')
        const todayString = new Date(dayRef.current.getTime() + 0 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
        const nextWeekString = new Date(dayRef.current.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
        console.log(todayString, nextWeekString)
        axios.get(`http://127.0.0.1:8000/get-rooms?from_date_string=${todayString}&to_date_string=${nextWeekString}`).then((res) => {
            const out = {}
            console.log(res.data)
            res.data["slots"].forEach((room) => {
                const startTime = new Date(room["start"]).toISOString()
                if(!out[room["itemId"]]) out[room["itemId"]] = {}
                out[room["itemId"]][startTime] = {}
                out[room["itemId"]][startTime]["checksum"] = room["checksum"]
                out[room["itemId"]][startTime]["booked"] = 'className' in room
            })
            console.log(out)
            setRooms(out)
        }).catch((err) => {
            console.log(err);
        })
    }

    if (!rooms) {
        return (
            <div></div>
        )
    }

    return (
        <div className={"Calendar w-auto h-auto"}>
            <div className={"Week w-auto h-auto flex gap-[1px]"}>
                {Array.from(Array(15).keys()).map((idx) =>
                    <Day key={idx} rooms={rooms} date={new Date(dayRef.current.getTime() + idx * 24 * 60 * 60 * 1000)}/>
                )}
            </div>
        </div>
    )
}