import Day from "./Day";
import {FaRotateRight} from "react-icons/fa6";
import {useHorizontalScroll} from "../utils/utils";

export default function Calendar({dayRef, rooms, roomID, selections, setSelections}) {
    const scrollRef = useHorizontalScroll()

    return (
        <div
            className={"Calendar w-auto h-full overflow-scroll relative grid place-items-center"}
            ref={scrollRef}
        >
            <div className={`absolute w-full h-full grid place-items-center ${rooms ? "hidden": "visible"}`}>
                <FaRotateRight size={64} className={"animate-spin"}/>
            </div>
            {rooms &&
                <div className={"Week h-full mobile:h-[100dvh] w-auto flex flex-row flex-nowrap gap-3 p-6"}>
                    {Array.from(Array(15).keys()).map((idx) =>
                        <div key={idx} className={"h-full w-[15rem] flex-none"}>
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