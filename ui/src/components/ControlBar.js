import roomInfo from "../roomInfo/room.definition"
import RoomDropdown from "./RoomDropdown";
export default function ControlBar({roomID, setRoomID}) {
    return (
        <div className={"w-full h-full border-b-2 border-black flex flex-row justify-around py-8 items-center"}>
            <div className={"flex flex-row gap-4"}>
                <p className={"text-2xl"}>Current Room:</p>
                <RoomDropdown options={Object.keys(roomInfo)} roomID={roomID} setRoomID={setRoomID}/>
            </div>
        </div>
    )
}