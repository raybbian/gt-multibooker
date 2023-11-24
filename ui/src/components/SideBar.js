import {getDateTimeFromIdx} from "../utils/utils";

export default function SideBar({selections}) {
    return (
        <div className={"w-full h-full bg-cream shadow-xl -z-10 p-8 flex flex-col gap-4"}>
            <p className={"text-2xl font-bold"}>Current Bookings:</p>
            {Object.keys(selections).sort().map((date) => (
                <div className={""}>
                    <p className={"text-xl font-semibold"}>{new Date(date).toDateString()}</p>
                    {selections[date].map((booking) => (
                        <p>{getDateTimeFromIdx(booking[0], new Date(date)).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })} - {getDateTimeFromIdx(booking[1]+1, new Date(date)).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}