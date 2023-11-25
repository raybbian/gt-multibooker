import Day from "./Day";

export default function Calendar({dayRef, rooms, startDay, roomID, selections, setSelections}) {
    if (!rooms) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className={"Calendar w-full h-full overflow-scroll"}>
            <div className={"Week w-full h-full grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-3 p-3"}>
                {Array.from(Array(7).keys()).map((idx) =>
                    <Day
                        key={startDay + idx}
                        rooms={rooms}
                        roomID={roomID}
                        date={new Date(dayRef.current.getTime() + (startDay + idx) * 24 * 60 * 60 * 1000)}
                        selections={selections}
                        setSelections={setSelections}
                    />
                )}
            </div>
        </div>
    )
}