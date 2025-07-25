import { lazy, Suspense } from "react";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as monaco from "monaco-editor";
import Dracula from "monaco-themes/themes/Dracula.json";

import type { OnMount } from "@monaco-editor/react";
import type { RootState } from "./Store/Store";

import {
  setSelectedFile,
  updateActiveFileContent,
} from "./Store/FileFeatures/FileSlice";

import OpenFilesBar from "./components/OpendFilesBar";
import ImgIcon from "./components/ImgIcon";

import ResizePanel from "./components/ResizePanel";

import { getFileByExtension, getLanguageFromFileName } from "./utils";

const Editor = lazy(() => import("@monaco-editor/react"));
const Preview = lazy(() => import('./components/Preview'));
const MyModal = lazy(() => import('./components/Modal'));
const File = lazy(() => import('./components/File'));


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { fileTree, ActiveLink, fileTabs } = useSelector(
    (state: RootState) => state.fileSlice
  );

  const handleEditorMount: OnMount = useCallback((_, monacoInstance) => {
    monacoInstance.editor.defineTheme(
      "Dracula",
      Dracula as monaco.editor.IStandaloneThemeData
    );
    monacoInstance.editor.setTheme("Dracula");
  }, []);

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      dispatch(updateActiveFileContent(value || ""));
    },
    [dispatch]
  );

  const handlePlayClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

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
              {fileTabs.length > 0 && (
                <div className="bg-[#2727357a] border-b border-gray-700 px-3 py-1">
                  <OpenFilesBar />
                </div>
              )}

              <div className="flex-1 relative">
                {ActiveLink?.id ? (
                  <>
                    <button
                      onClick={handlePlayClick}
                      className="fixed z-50 right-5 top-4"
                      aria-label="Run Preview"
                      title="Run Preview"
                    >
                      <ImgIcon
                        src="play-svgrepo-com.svg"
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                    <Suspense
                      fallback={
                        <div className="text-white p-4">Loading Editor...</div>
                      }
                    >
                      <Editor
                        height="100%"
                        language={getLanguageFromFileName(ActiveLink.name)}
                        value={ActiveLink.content}
                        onMount={handleEditorMount}
                        onChange={handleEditorChange}
                        theme="Dracula"
                        options={{
                          fontSize: 20,
                          fontFamily: "monospace",
                          automaticLayout: true,
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                        }}
                      />
                    </Suspense>
                  </>
                ) : (
                  <div className="text-gray-400 p-4 h-full flex items-center justify-center">
                    <ImgIcon
                      src="icons/vscode.svg"
                      alt="Welcome VSCode"
                      className="w-60 h-60"
                    />
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>

      <MyModal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Suspense fallback={<div>Loading...</div>}>

        <Preview
          html={getFileByExtension(fileTabs, ".html")}
          css={getFileByExtension(fileTabs, ".css")}
          js={getFileByExtension(fileTabs, ".js")}
        />
      </Suspense>
      </MyModal>
    </div>
  );
}

export default App;
