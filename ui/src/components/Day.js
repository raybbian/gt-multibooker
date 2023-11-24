import Slot from "./Slot";
import {useEffect, useRef, useState} from "react";
import {getDateTimeFromIdx} from "../utils/utils";

export default function Day({rooms, roomID, date, selections, setSelections}) {
    const [currSelectionFrom, setSelectionFrom] = useState(-1);
    const [currSelectionTo, setSelectionTo] = useState(-1);
    const [dragging, setDragging] = useState(false);


    //reset selections on roomID change
    useEffect(() => {
        setDragging(false)
        setSelectionTo(-1)
        setSelectionFrom(-1)
    }, [roomID]);

    function handleMouseUp() {
        if (!dragging) return
        setDragging(false)
        const updSelections = {...selections}
        if (!updSelections[date.toISOString()]) updSelections[date.toISOString()] = []
        updSelections[date.toISOString()].push([currSelectionFrom, currSelectionTo])
        setSelections(updSelections)
        console.log(updSelections)
    }

    return (
        <div
            className={"w-full h-full grid grid-cols-4 grid-rows-[repeat(24,_minmax(0,_1fr))] place-items-stretch gap-0.5"}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
        >
            {Array.from(Array(96).keys()).map((idx) =>
                <Slot
                    key={idx}
                    idx={idx}
                    rooms={rooms}
                    roomID={roomID}
                    date={date}
                    dateTime={getDateTimeFromIdx(idx, date)}
                    dragging={dragging}
                    setDragging={setDragging}
                    currSelectionFrom={currSelectionFrom}
                    setSelectionFrom={setSelectionFrom}
                    currSelectionTo={currSelectionTo}
                    setSelectionTo={setSelectionTo}
                    selections={selections}
                />
            )}
        </div>
    )
}