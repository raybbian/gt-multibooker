import Slot from "./Slot";

export default function Day({rooms, date}) {
    return (
        <div className={"min-w-[14rem] h-full grid grid-rows-[repeat(48,_minmax(0,_1fr))] place-items-stretch gap-[1px]"}>
            {Array.from(Array(96).keys()).map((idx) =>
                <Slot key={idx} rooms={rooms} dateTime={new Date(date.getTime() + idx * 15 * 60 * 1000)}/>
            )}
        </div>
    )
}