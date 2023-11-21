import Slot from "./Slot";

export default function Day({rooms, roomID, date}) {
    return (
        <div className={"w-full h-full grid grid-cols-4 grid-rows-[repeat(24,_minmax(0,_1fr))] place-items-stretch gap-0.5"}>
            {Array.from(Array(96).keys()).map((idx) =>
                <Slot key={idx} rooms={rooms} roomID={roomID} dateTime={new Date(date.getTime() + idx * 15 * 60 * 1000)}/>
            )}
        </div>
    )
}