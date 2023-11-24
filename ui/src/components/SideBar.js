import {getDateTimeFromIdx} from "../utils/utils";
import {FaArrowRight, FaTrash} from "react-icons/fa6";

export default function SideBar({selections, setSelections}) {
    function removeSelection(idx, date) {
        const updSelections = JSON.parse(JSON.stringify(selections))
        updSelections[date] = updSelections[date].filter((booking) => idx !== booking[0])
        setSelections(updSelections)
    }

    return (
        <div className={"w-full h-full bg-cream border-r-2 border-black flex flex-col justify-between overflow-hidden"}>
            <div className={"w-full h-full flex flex-col gap-2 overflow-y-scroll p-8"}>
                <p className={"text-2xl font-bold"}>Current Bookings:</p>
                <div className={"w-1/3 h-[2px] bg-black"}></div>
                <div className={"flex flex-col"}>
                    {Object.keys(selections).sort().map((date) => (
                        <div className={"flex flex-col gap-2"}>
                            {selections[date].length > 0 && <p className={"text-xl font-semibold mt-4"}>{new Date(date).toDateString()}</p>}
                            {selections[date].map((booking) => (
                                <div className={"flex flex-row justify-between w-full h-full border-2 border-black"}>
                                    <div className={"h-full flex"}>
                                        <div className={"w-2 h-full bg-sakura-pink"}></div>
                                        <p className={"p-2 ml-2"}>
                                            {getDateTimeFromIdx(booking[0], new Date(date)).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })} - {getDateTimeFromIdx(booking[1]+1, new Date(date)).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                    <div className={"h-full flex p-2 items-center"}>
                                        <button
                                            onClick={() => {
                                                removeSelection(booking[0], date)
                                            }}>
                                            <FaTrash className={"hover:text-koi-red"}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={"flex flex-row justify-end p-8 relative shadow-md"}>
                {Object.keys(selections).length !== 0 && <FaArrowRight
                    className={"hover:text-koi-red"}
                    size={48}
                />}
            </div>
        </div>
    )
}