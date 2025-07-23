import { useSelector } from "react-redux";
import type { RootState } from "../Store/Store";
import BarItems from "./BarItems";

function OpenFilesBar() {
  const { fileTabs } = useSelector(
    (state: RootState) => state.fileSlice
  );
  return (
    <>
      <div className=" flex justify-start px-2 cursor-pointer gap-5">
        {fileTabs.map((file) => (
          <BarItems key={file.id} file={file} />
        ))}
      </div>
    </>
  );
}

export default OpenFilesBar;
