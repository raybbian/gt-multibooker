import {useEffect, useRef} from "react";

export function getDateTimeFromIdx(idx, date) {
    return new Date(date.getTime() + idx * 15 * 60 * 1000)
}

export function roomStatus(roomInfo, roomID, idx, date, selections) {
    if (selections[date.toISOString()]) {
        for(let i = 0; i < selections[date.toISOString()].length; i++) {
            const from = selections[date.toISOString()][i][0];
            const to = selections[date.toISOString()][i][1];
            if (from <= idx && idx <= to) {
                return "selected"
            }
        }
    }

    const dateTime = getDateTimeFromIdx(idx, date)
    if (roomInfo[roomID] && roomInfo[roomID][dateTime.toISOString()] && roomInfo[roomID][dateTime.toISOString()]) {
        if (roomInfo[roomID][dateTime.toISOString()]['booked']) {
            return "booked";
        } else {
            return "available";
        }
    } else {
        return "unavailable"
    }
}

export const colors = {
    "booked": "bg-teal",
    "unavailable": "bg-cream",
    "available": "bg-light-green",
    "selected": "bg-sakura-pink",
}

export function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = e => {
                if (e.deltaY == 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}
