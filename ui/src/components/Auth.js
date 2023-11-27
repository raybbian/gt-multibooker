import {FaArrowRight} from "react-icons/fa6";
import {toast} from "react-toastify";

export default function Auth({toggleAuthPanel, lc_ea_po}) {
    return (
        <div
            className={"absolute w-full h-full grid place-items-center bg-black bg-opacity-50 z-20"}
            onClick={() => toggleAuthPanel(false)}
        >
            <div
                className={"w-[36rem] max-w-[90dvw] h-54 bg-cream rounded-lg shadow-md p-8 flex flex-col gap-4"}
                onClick={(e) => e.stopPropagation()}
            >
                <p className={"font-bold text-2xl"}>
                    Enter your Auth Token:
                </p>
                <form
                    className={"flex flex-col gap-4"}
                    onSubmit={(e) => {
                        e.preventDefault()
                        const token = e.target[0].value
                        lc_ea_po.current = token
                        //TODO: save as cookie
                        toast.success("Token Entered!")
                        toggleAuthPanel(false)
                    }}
                >
                    <input type={"text"} placeholder={"lc_ea_po"} className={"w-full bg-cream border-2 border-black p-2"}/>
                    <div className={"flex flex-row gap-4 justify-between"}>
                        <small>Not sure what this is? Click <a href={"https://github.com/raybbian/gt-multibooker"} target={"_blank"} rel={"noreferrer"}>here.</a></small>
                        <button type={"submit"}>
                            <FaArrowRight
                                className={"hover:text-koi-red"}
                                size={48}
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}