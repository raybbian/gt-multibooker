import {getDateTimeFromIdx} from "../utils/utils";
import {FaArrowRight, FaTrash} from "react-icons/fa6";
import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";

export default function SideBar({rooms, roomID, selections, setSelections, lc_ea_po, getRooms, toggleAuthPanel}) {
    const [bookingName, setBookingName] = useState("Study")
    const [bookingAccess, setBookingAccess] = useState([])

    function removeSelection(idx, date) {
        const updSelections = JSON.parse(JSON.stringify(selections))
        updSelections[date] = updSelections[date].filter((booking) => idx !== booking[0])
        setSelections(updSelections)
    }

    function submitBookings() {
        if (lc_ea_po.current.length !== 341) {
            toast.error('Cannot submit bookings without auth token!')
            toggleAuthPanel(true)
            return;
        }
        Object.keys(selections).sort().forEach((date) => {
            selections[date].forEach((booking) => {
                if (booking[1] - booking[0] + 1 > 8) {
                    bookRoom(date, booking[0] + 8, booking[1])
                    booking[1] = booking[0] + 7
                }
                bookRoom(date, booking[0], booking[1])
            })
        })
        getRooms()
    }

    function bookRoom(date, start, end) {
        const additionalAccess = bookingAccess.length === 0 ? "No" : "Yes"
        const gtidList = bookingAccess.join(", ")
        //add the booking to cart from the API
        const startDateTime = getDateTimeFromIdx(start, new Date(date));
        const startChecksum = rooms[roomID][startDateTime.toISOString()]['checksum'];
        //send request to api with roomID, startTime (weird ver), startChecksum, from_date and to_date
        const startTimeString = `${startDateTime.toLocaleDateString('en-CA')}.${startDateTime.toLocaleTimeString('en-GB')}`;
        const startDateString = new Date(date).toLocaleDateString('en-CA')
        const endDateString = new Date(new Date(date).getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
        axios.post(`https://api.multibooker.raybb.dev/add-room?item_id=${roomID}&start_time_urlencoded=${startTimeString}&duration=${end - start + 1}&checksum=${startChecksum}&from_date=${startDateString}&to_date=${endDateString}&lc_ea_po=${lc_ea_po.current}&name=${bookingName}&additional_access=${additionalAccess}&gtid_list=${gtidList}`).then((res) => {
            if (res.data.substring(0, 3) === "<p>") {
                toast.error('You cannot book more than 4 hours on a given day!')
                return;
            }
            toast.success(`Successfully added booking on ${new Date(date).toLocaleDateString('en-CA')} from ${getDateTimeFromIdx(start, new Date(date)).toLocaleTimeString('en-US')} to ${getDateTimeFromIdx(end + 1, new Date(date)).toLocaleTimeString('en-US')}`)
        }).catch((err) => {
            toast.error('An error has occurred! Refresh and try again.')
        })
    }

    return (
        <div className={"w-full h-full bg-cream border-r-2 border-black flex flex-col justify-between overflow-hidden"}>
            <div className={"w-full h-full flex flex-col gap-2 overflow-y-scroll p-8"}>
                <p className={"text-xl font-bold"}>Booking Name:</p>
                <input className={"w-full bg-cream border-2 border-black p-2 text-base"} type={"text"} value={bookingName} onChange={(e) => setBookingName(e.value)}/>
                <p className={"text-xl font-bold"}>Additional Access:</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const newID = e.target[0].value
                        if (newID.length !== 9) {
                            toast.error("Invalid GTID!")
                            return;
                        }
                        if (bookingAccess.includes(newID)) {
                            toast.error("Already given access to this GTID!")
                            return;
                        }
                        const updBookingAccess = [...bookingAccess]
                        updBookingAccess.push(newID)
                        setBookingAccess(updBookingAccess)
                    }}
                >
                    <input className={"w-full bg-cream border-2 border-black p-2 mb-2 text-base"} type={"text"} placeholder={"Input a GTID and press enter."}/>
                </form>
                <div className={"flex flex-col gap-2"}>
                    {bookingAccess.map((gtID) => (
                        <div key={gtID} className={"flex flex-row justify-between w-full h-full border-2 border-black"}>
                            <div className={"h-full flex"}>
                                <div className={"w-2 h-full bg-teal"}></div>
                                <p className={"p-2 ml-2"}>
                                    {gtID}
                                </p>
                            </div>
                            <div className={"h-full flex p-2 items-center"}>
                                <button
                                    onClick={() => {
                                        const updBookignAccess = bookingAccess.filter((element) => element !== gtID)
                                        setBookingAccess(updBookignAccess)
                                    }}>
                                    <FaTrash className={"hover:text-koi-red"}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className={"text-xl font-bold"}>Current Bookings:</p>
                <div className={"flex flex-col"}>
                    {Object.keys(selections).sort().map((date) => (
                        <div key={date} className={"flex flex-col gap-2"}>
                            {selections[date].length > 0 && <p className={"text-base font-semibold mt-4"}>{new Date(date).toDateString()}</p>}
                            {selections[date].map((booking) => (
                                <div key={`${booking[0]}-${booking[1]}`} className={"flex flex-row justify-between w-full h-full border-2 border-black"}>
                                    <div className={"h-full flex"}>
                                        <div className={"w-2 h-full bg-sakura-pink"}></div>
                                        <p className={"p-2 ml-2 text-sm"}>
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
            <div className={"flex flex-row justify-end p-8 relative"}>
                <FaArrowRight
                    className={"hover:text-koi-red"}
                    size={48}
                    onClick={() => submitBookings()}
                />
            </div>
        </div>
    )
}