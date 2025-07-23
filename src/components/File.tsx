import { memo, useState } from "react";
import type { IFileTree } from "../interfaces";
import RightArrow from "./SVG/RightArrow";
import DownArrow from "./SVG/DownArrow";
import RenderFileIcon from "./SVG/RenderFileIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  addFileToSrc,
  removeFile,
  renameFile,
  setActiveLink,
  setFileTaps,
  setSelectedFile,
} from "../Store/FileFeatures/FileSlice";
import type { RootState } from "../Store/Store";
import ImgIcon from "./ImgIcon";

interface IFileProps {
  FileTree: IFileTree;
}

function File({ FileTree: { name, children, type, id, content } }: IFileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(name);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const selectedFile = useSelector(
    (state: RootState) => state.fileSlice.selectedFile
  );

  const isSelected = selectedFile?.id === id;

  const dispatch = useDispatch();

  return (
    <div className="text-white ml-1 mb-1 w-fit font-mono">
      <div className="flex items-center cursor-pointer w-fit">
        {type === "folder" && (
          <span
            className="mr-1"
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
          >
            {isOpen ? <DownArrow /> : <RightArrow />}
          </span>
        )}

        <span
          className={`flex items-center gap-1 px-1 py-0.5 rounded `}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedFile({ id, name, children, type, content }));
            if (type === "file") {
              dispatch(setFileTaps({ id, name, children, type, content }));
              dispatch(setActiveLink({ id, name, children, type, content }));
            }
          }}
        >
          <RenderFileIcon isOpen={isOpen} type={type} fileName={name} />
          <span
            className={`${type === "folder" ? "font-medium" : "font-normal"}  ${
              isSelected ? "text-cyan-500" : "text-gray-300"
            }`}
          >
            {name}
          </span>
          {(type == "file" && name.endsWith(".html")) ||
          name.endsWith(".js") ||
          name.endsWith(".css") ? (
            <>
              <span
                onClick={() => {
                  if (type !== "file") return;
                  if (!selectedFile) return;
                  const blob = new Blob([selectedFile.content || ""], {
                    type: "text/plain;charset=utf-8",
                  });
                  const url = URL.createObjectURL(blob);
                  const Link = document.createElement("a");
                  Link.href = url;
                  Link.download = selectedFile.name;
                  Link.click();
                  URL.revokeObjectURL(url);
                }}
                className="cursor-pointer"
              >
                <ImgIcon
                  src="file-download-svgrepo-com.svg"
                  className="w-[17px] h-[17px]"
                  alt="download"
                />
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenaming((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                <ImgIcon
                  src="rename-svgrepo-com.svg"
                  className="w-[17px] h-[17px]"
                  alt="edit"
                />
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeFile({id: id}));
                }}
                className="cursor-pointer">
                <ImgIcon
                  src="delete-svgrepo-com.svg"
                  className="w-[17px] h-[17px]"
                  alt="close"
                />
              </span>
            </>
          ) : null}
        </span>
      </div>
      {type === "file" && isRenaming && (
        <div className="block ml-6 w-[40px]">
          <input
            className="bg-transparent text-white border border-gray-600 px-2 py-1 text-[12px] rounded focus:outline-none focus:border-cyan-700"
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            placeholder="name(.js .html .css)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const ext = renameValue.split(".").pop()?.toLowerCase() || "";
                const allowed = ["js", "html", "css"];

                if (!allowed.includes(ext)) {
                  alert("Invalid file extension");
                  setRenameValue(name);
                  return;
                }
                dispatch(
                  renameFile({ id, newName: renameValue, extension: ext })
                );
                setIsRenaming(false);
              }
            }}
          />
        </div>
      )}
      {type === "folder" && name === "src" && isOpen && (
        <div className=" ml-8">
          <input
            className="bg-transparent text-white border border-gray-600 px-2 py-1 text-[12px] rounded focus:outline-none focus:border-cyan-700"
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="name(.js .html .css)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                const extension =
                  newFileName.split(".").pop()?.toLowerCase() || "";
                dispatch(addFileToSrc({ name: newFileName, extension }));
                setNewFileName("");
              }
            }}
          />
        </div>
      )}

      {isOpen && children && (
        <div className="ml-5">
          {children.map((child) => (
            <File key={child.id} FileTree={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(File);
