import { useDispatch, useSelector } from "react-redux";
import type { IFileTree } from "../interfaces";
import ImgIcon from "./ImgIcon";
import RenderFileIcon from "./SVG/RenderFileIcons";
import { removeFileTab, setActiveLink } from "../Store/FileFeatures/FileSlice";
import type { RootState } from "../Store/Store";

interface BarItemsProps {
  file: IFileTree;
}

function BarItems({ file }: BarItemsProps) {
  const dispatch = useDispatch();
  const { ActiveLink } = useSelector((state: RootState) => state.fileSlice);


  const onRemove = (id: string) => {
    dispatch(removeFileTab(id)); 
  }

  return (
    <div
      onClick={() => {
        dispatch(setActiveLink(file));
      }}
      className={`py-2 rounded-md flex items-center gap-1 hover:bg-[#2b2b3a8e] px-2 ${
        ActiveLink?.id == file.id ? "border-t-3 border-fuchsia-700" : ""
      } `}
    >
      <span className="mt-0.5">
        <RenderFileIcon type="file" fileName={file.name} />
      </span>
      <span className="text-white">{file.name}</span>
      <span
        className="text-gray-500 ml-1"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id)
        }}
      >
        <ImgIcon src="cancel-svgrepo-com.svg" className="w-[20px] h-[20px]" />
      </span>
    </div>
  );
}

export default BarItems;
