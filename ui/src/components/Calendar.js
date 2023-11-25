import Day from "./Day";
import {FaRotateRight} from "react-icons/fa6";
import {useHorizontalScroll} from "../utils/utils";

export default function Calendar({dayRef, rooms, roomID, selections, setSelections}) {
    const scrollRef = useHorizontalScroll()

    return (
        <div
            className={"Calendar w-auto h-full overflow-x-scroll relative grid place-items-center"}
            ref={scrollRef}
        >
            <div className={`absolute w-full h-full grid place-items-center ${rooms ? "hidden": "visible"}`}>
                <FaRotateRight size={64} className={"animate-spin"}/>
            </div>
            {rooms &&
                <div className={"Week h-full w-auto flex flex-row flex-nowrap gap-3 p-3"}>
                    {Array.from(Array(14).keys()).map((idx) =>
                        <div key={idx} className={"h-full w-[12rem] flex-none"}>
                            <Day
                                rooms={rooms}
                                roomID={roomID}
                                date={new Date(dayRef.current.getTime() + idx * 24 * 60 * 60 * 1000)}
                                selections={selections}
                                setSelections={setSelections}
                            />
                        </div>
                    )}
                </div>
            }
        </div>
    )
}