import './App.css';
import Calendar from "./components/Calendar";
import ControlBar from "./components/ControlBar";
import SideBar from "./components/SideBar";
import {useEffect, useRef, useState} from "react";
import {ToastContainer} from "react-toastify";
import Auth from "./components/Auth";


function App() {
    const [roomID, setRoomID] = useState(158445)
    const [selections, setSelections] = useState({});
    const [showAuthPanel, toggleAuthPanel] = useState(false);
    const lc_ea_po = useRef("");

    useEffect(() => {
        setSelections({})
    }, [roomID]);

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
                    lc_ea_po={lc_ea_po}
                />
            </div>
            <div className={"flex-auto flex flex-row overflow-hidden"}>
                <div className={"w-1/5 overflow-hidden"}>
                    <SideBar
                        selections={selections}
                        setSelections={setSelections}
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
