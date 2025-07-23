import { svgStyles } from "../../styles";

function RightArrow() {
    return (  

        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="cursor-pointer text-gray-400"
                {...svgStyles}
            >
                <path
                    fillRule="evenodd"
                    d="M10.293 16.707a1 1 0 010-1.414L13.586 12l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                />
            </svg>
        </>
    );
}

export default RightArrow;