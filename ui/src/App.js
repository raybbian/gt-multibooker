import './App.css';
import Calendar from "./components/Calendar";
import ControlBar from "./components/ControlBar";
import SideBar from "./components/SideBar";
import {useEffect, useRef, useState} from "react";
import {ToastContainer} from "react-toastify";
import Auth from "./components/Auth";
import axios from "axios";


function App() {
    const [roomID, setRoomID] = useState(158445)
    const [selections, setSelections] = useState({});
    const [showAuthPanel, toggleAuthPanel] = useState(false);
    const [rooms, setRooms] = useState(null); //the display for all the rooms

    const lc_ea_po = useRef("");
    const dayRef = useRef(new Date(new Date().setHours(0, 0, 0, 0)))

    const [startDay, setStartDay] = useState(0)

    useEffect(() => {
        setSelections({})
    }, [roomID]);

    useEffect(() => {
        getRooms();
    }, [])

    function getRooms() {
        // const todayString = dayRef.current.toLocaleDateString('en-CA')
        const todayString = new Date(dayRef.current.getTime()).toLocaleDateString('en-CA') //gets date in yyyy-mm-dd format
        const nextWeekString = new Date(dayRef.current.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
        axios.get(`https://api.multibooker.raybb.dev/get-rooms?from_date_string=${todayString}&to_date_string=${nextWeekString}`).then((res) => {
            const out = {}
            res.data["slots"].forEach((room) => {
                const startTime = new Date(room["start"]).toISOString()
                if(!out[room["itemId"]]) out[room["itemId"]] = {}
                out[room["itemId"]][startTime] = {}
                out[room["itemId"]][startTime]["checksum"] = room["checksum"]
                out[room["itemId"]][startTime]["booked"] = 'className' in room
            })
            setRooms(out)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className={"w-[100dvw] h-[100dvh] flex flex-col bg-sage-green relative overflow-hidden"}>
            {showAuthPanel && <Auth
                toggleAuthPanel={toggleAuthPanel}
                lc_ea_po={lc_ea_po}
            />}
            <div className={"h-16"}>
                <ControlBar
                    roomID={roomID}
                    setRoomID={setRoomID}
                    setSelections={setSelections}
                    toggleAuthPanel={toggleAuthPanel}
                    startDay={startDay}
                    setStartDay={setStartDay}
                    dayRef={dayRef}
                />
            </div>
            <div className={"flex-auto flex flex-row overflow-hidden"}>
                <div className={"w-1/5 overflow-hidden"}>
                    <SideBar
                        rooms={rooms}
                        roomID={roomID}
                        selections={selections}
                        setSelections={setSelections}
                        lc_ea_po={lc_ea_po}
                        getRooms={getRooms}
                    />
                </div>
                <div className={"flex-auto"}>
                    <Calendar
                        dayRef={dayRef}
                        rooms={rooms}
                        startDay={startDay}
                        roomID={roomID}
                        selections={selections}
                        setSelections={setSelections}
                    />
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastStyle={{
                    border: '2px solid black',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    color: "black",
                }}
            />
        </div>
    );
}

export default App;
