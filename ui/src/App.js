import './App.css';
import Calendar from "./components/Calendar";
import ControlBar from "./components/ControlBar";
import SideBar from "./components/SideBar";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [roomID, setRoomID] = useState(158445)
    const [selections, setSelections] = useState({});

    useEffect(() => {
        setSelections({})
    }, [roomID]);

    return (
        <div className={"w-[100dvw] h-[100dvh] flex flex-col bg-sage-green"}>
            <div className={"h-16"}>
                <ControlBar
                    roomID={roomID}
                    setRoomID={setRoomID}
                    setSelections={setSelections}
                />
            </div>
            <div className={"flex-auto flex flex-row"}>
                <div className={"w-1/4"}>
                    <SideBar
                        selections={selections}
                    />
                </div>
                <div className={"flex-auto"}>
                    <Calendar
                        startDay={0}
                        roomID={roomID}
                        selections={selections}
                        setSelections={setSelections}
                    />
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
