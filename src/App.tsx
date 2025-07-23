import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedFile,
  updateActiveFileContent,
} from "./Store/FileFeatures/FileSlice";
import File from "./components/File";
import type { RootState } from "./Store/Store";
import OpenFilesBar from "./components/OpendFilesBar";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import { getFileByExtension, getLanguageFromFileName } from "./utils";
import * as monaco from "monaco-editor";
import Dracula from "monaco-themes/themes/Dracula.json";
import Preview from "./components/Preview";
import ImgIcon from "./components/ImgIcon";
import MyModal from "./components/Modal";
import { useState } from "react";
import ResizePanel from "./components/ResizePanel"; // ✅ تأكد إن المسار صح

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { fileTree, ActiveLink, fileTabs } = useSelector(
    (state: RootState) => state.fileSlice
  );

  const handleEditorMount: OnMount = (_, monacoInstance) => {
    monacoInstance.editor.defineTheme(
      "Dracula",
      Dracula as monaco.editor.IStandaloneThemeData
    );
    monacoInstance.editor.setTheme("Dracula");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <ResizePanel
          defaultLayout={[15, 85]}
          leftPanel={
            <div
              className="h-full border-r border-gray-700 pt-2"
              onClick={() => dispatch(setSelectedFile(null))}
            >
              <File FileTree={fileTree} />
            </div>
          }
          rightPanel={
            <div className="flex flex-col h-full">
              <div
                className={`bg-[#2727357a] border-b border-gray-700 flex items-center px-3 ${
                  fileTabs.length ? "py-1" : ""
                }`}
              >
                <OpenFilesBar />
              </div>

              <div className="flex-1">
                {ActiveLink?.id ? (
                  <>
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <ImgIcon
                        src="play-svgrepo-com.svg"
                        className="w-[20px] h-[20px] fixed z-50 right-5 top-4"
                      />
                    </div>
                    <Editor
                      height="100%"
                      language={getLanguageFromFileName(ActiveLink.name)}
                      value={ActiveLink.content}
                      onMount={handleEditorMount}
                      onChange={(value) =>
                        dispatch(updateActiveFileContent(value || ""))
                      }
                      theme="Dracula"
                      options={{
                        fontSize: 20,
                        fontFamily: "monospace",
                        automaticLayout: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                      }}
                    />
                  </>
                ) : (
                  <div className="text-gray-400 p-4 h-full  flex items-center justify-center">
                    <ImgIcon
                      src="icons/vscode.svg"
                      alt="welcom VS code"
                      className="w-60 h-60"
                    />
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>

      {/* Preview Section */}
      <div className="rounded-md bg-gray-800 mt-10">
        <MyModal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
          <Preview
            html={getFileByExtension(fileTabs, ".html")}
            css={getFileByExtension(fileTabs, ".css")}
            js={getFileByExtension(fileTabs, ".js")}
          />
        </MyModal>
      </div>
    </div>
  );
}

export default App;



