import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Day from "./Day";

export default function Calendar({startDay, roomID}) {
    useEffect(() => {
        getRooms();
    }, [])

    const timeRef = useRef(new Date())
    const dayRef = useRef(new Date(new Date().setHours(0, 0, 0, 0)))
    const [rooms, setRooms] = useState(null);

    function getRooms() {
        // const todayString = dayRef.current.toLocaleDateString('en-CA')
        const todayString = new Date(dayRef.current.getTime() + startDay * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA') //gets date in yyyy-mm-dd format
        const nextWeekString = new Date(dayRef.current.getTime() + (startDay + 7) * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
        axios.get(`http://127.0.0.1:8000/get-rooms?from_date_string=${todayString}&to_date_string=${nextWeekString}`).then((res) => {
            const out = {}
            res.data["slots"].forEach((room) => {
                const startTime = new Date(room["start"]).toISOString()
                if(!out[room["itemId"]]) out[room["itemId"]] = {}
                out[room["itemId"]][startTime] = {}
                out[room["itemId"]][startTime]["checksum"] = room["checksum"]
                out[room["itemId"]][startTime]["booked"] = 'className' in room
            })
            setRooms(out)
        }).catch((err) => {
            console.log(err);
        })
    }

    if (!rooms) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className={"Calendar w-full h-full overflow-scroll"}>
            <div className={"Week w-full h-full grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-2 p-2"}>
                {Array.from(Array(7).keys()).map((idx) =>
                    <Day key={startDay + idx} rooms={rooms} roomID={roomID} date={new Date(dayRef.current.getTime() + (startDay + idx) * 24 * 60 * 60 * 1000)}/>
                )}
            </div>
        </div>
    )
}