import './App.css';
import Calendar from "./components/Calendar";
import ControlBar from "./components/ControlBar";
import SideBar from "./components/SideBar";
import {useEffect, useState} from "react";

function App() {
    const [roomID, setRoomID] = useState(158445)
    return (
        <div className={"w-[100dvw] h-[100dvh] flex flex-col"}>
            <div className={"h-16"}>
                <ControlBar roomID={roomID} setRoomID={setRoomID}/>
            </div>
            <div className={"flex-auto flex flex-row"}>
                <div className={"flex-auto"}>
                    <Calendar startDay={0} roomID={roomID}/>
                </div>
                <div className={"w-64"}>
                    <SideBar/>
                </div>
            </div>
        </div>
    );
}

export default App;
