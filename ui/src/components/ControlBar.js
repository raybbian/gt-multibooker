import roomInfo from "../roomInfo/room.definition"
import RoomDropdown from "./RoomDropdown";
import {FaKey, FaTrash} from "react-icons/fa6";
export default function ControlBar({roomID, setRoomID, setSelections, toggleAuthPanel}) {
    return (
        <div className={"w-full h-full bg-cream border-b-2 border-black relative flex flex-row justify-between p-8 items-center"}>
            <div className={"flex flex-row gap-6"}>
                <div className={"flex flex-row gap-4 items-center"}>
                    <p className={"text-2xl font-bold"}>Current Room:</p>
                    <RoomDropdown options={Object.keys(roomInfo)} roomID={roomID} setRoomID={setRoomID}/>
                </div>
            </div>
            <div className={"flex flex-row gap-4"}>
                <FaKey
                    size={24}
                    className={"hover:text-koi-red"}
                    onClick={() => toggleAuthPanel(true)}
                />
                <FaTrash
                    size={24}
                    className={"hover:text-koi-red"}
                    onClick={() => setSelections({})}
                />
            </div>
        </div>
    )
}