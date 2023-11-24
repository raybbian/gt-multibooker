
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
    "booked": "bg-yellow-200",
    "unavailable": "bg-slate-200",
    "available": "bg-green-200",
    "selected": "bg-blue-200",
}