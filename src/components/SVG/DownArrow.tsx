import { useDispatch } from "react-redux";
import { setSelectedFile } from "../../Store/FileFeatures/FileSlice";

function DownArrow() {

    const dispatch = useDispatch();
    return (  
        <svg
        onClick={
            ()=>{
                dispatch(setSelectedFile(null));
            }
        }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
        >
            <path
                fillRule="evenodd"
                d="M4.293 8.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default DownArrow;