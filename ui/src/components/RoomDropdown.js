import { useState } from 'react';
import roomInfo from "../roomInfo/room.definition";

export default function RoomDropdown({ options, roomID, setRoomID }) {
    const [search, setSearch] = useState(roomID);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className={"relative hover:cursor-pointer z-10 w-full"}>
            <input
                type="text"
                className={"text-base p-2 border-2 border-black hover:cursor-pointer bg-cream w-full"}
                value={roomInfo[search]}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 100)}
                readOnly={true}
            />
            {showOptions && (
                <div className={"absolute text-base bg-white w-full h-48 overflow-y-scroll border-x-2 last:border-b-2 border-black flex flex-col"}>
                    {options.sort((a,b) => roomInfo[a].localeCompare(roomInfo[b])).map((option, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSearch(parseInt(option, 10))
                                setRoomID(parseInt(option, 10))
                            }}
                            className={`hover:bg-sakura-pink px-2 ${option === search ? "bg-sakura-pink" : ""}bg-cream`}
                        >
                            {roomInfo[option]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
