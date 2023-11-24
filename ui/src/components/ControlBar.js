import roomInfo from "../roomInfo/room.definition"
import RoomDropdown from "./RoomDropdown";
import {FaArrowRotateLeft, FaTrash} from "react-icons/fa6";
export default function ControlBar({roomID, setRoomID, setSelections}) {
    return (
        <div className={"w-full h-full bg-cream shadow-xl relative flex flex-row justify-between p-8 items-center"}>
            <div className={"flex flex-row gap-4"}>
                <p className={"text-2xl font-bold"}>Current Room:</p>
                <RoomDropdown options={Object.keys(roomInfo)} roomID={roomID} setRoomID={setRoomID}/>
            </div>
            <div className={"flex flex-row gap-4"}>
                <FaTrash
                    size={24}
                    className={"hover:text-koi-red"}
                    onClick={() => setSelections({})}
                />
            </div>
        </div>
    )
}