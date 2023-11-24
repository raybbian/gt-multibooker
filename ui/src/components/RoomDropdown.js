import { useState } from 'react';
import roomInfo from "../roomInfo/room.definition";

export default function RoomDropdown({ options, roomID, setRoomID }) {
    const [search, setSearch] = useState(roomID);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className={"relative hover:cursor-pointer"}>
            <input
                type="text"
                className={"text-xl px-2 border-2 border-black hover:cursor-pointer bg-cream"}
                value={roomInfo[search]}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 100)}
                readOnly={true}
            />
            {showOptions && (
                <ul className={"absolute text-xl bg-white w-full border-x-2 last:border-b-2 border-black"}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSearch(parseInt(option, 10))
                                setRoomID(parseInt(option, 10))
                            }}
                            className={`hover:bg-sakura-pink px-2 ${option === search ? "bg-sakura-pink" : ""}bg-cream`}
                        >
                            {roomInfo[option]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
