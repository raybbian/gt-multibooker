import Slot from "./Slot";
import {useEffect, useRef, useState} from "react";
import {getDateTimeFromIdx} from "../utils/utils";
import {toast} from "react-toastify";

export default function Day({rooms, roomID, date, selections, setSelections}) {
    const [currSelectionFrom, setSelectionFrom] = useState(-1);
    const [currSelectionTo, setSelectionTo] = useState(-1);
    const [dragging, setDragging] = useState(false);
    const [totalBookingDuration, setTotalBookingDuration] = useState(0);


    //reset selections on roomID change
    useEffect(() => {
        setDragging(false)
        setSelectionTo(-1)
        setSelectionFrom(-1)
    }, [roomID]);

    function handleMouseUp() {
        if (!dragging) return
        setDragging(false)

        setSelectionFrom(-1)
        setSelectionTo(-1)


        const updSelections = JSON.parse(JSON.stringify(selections))
        if (!updSelections[date.toISOString()]) updSelections[date.toISOString()] = []
        updSelections[date.toISOString()].push([currSelectionFrom, currSelectionTo]) //merge algo
        updSelections[date.toISOString()].sort((a, b) => a[0] - b[0]);
        const merged = [];
        for (let i of updSelections[date.toISOString()]) {
            if (merged.length !== 0 && merged[merged.length - 1][1] >= i[0] - 1) {
                let lastInterval = merged.pop();
                merged.push([lastInterval[0], Math.max(i[1], lastInterval[1])]);
            } else {
                merged.push(i);
            }
        }

        //checks if today would exceed 4 hours
        let sum = 0;
        for(let i of merged) {
            sum += i[1] - i[0] + 1;
        }
        if (sum > 16) {
            toast.error("You cannot book more than 4 hours in one day!")
            return;
        }

        setTotalBookingDuration(sum)
        updSelections[date.toISOString()] = merged;
        setSelections(updSelections)
    }

    return (
        <div
            className={"w-full h-full grid grid-cols-4 grid-rows-[repeat(24,_minmax(0,_1fr))] place-items-stretch border-2 border-black"}
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
                    setSelections={setSelections}
                />
            )}
        </div>
    )
}