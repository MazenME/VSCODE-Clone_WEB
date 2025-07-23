import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IFileTree } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import { FileTree } from "../../data/fileTree";

const savedTree = sessionStorage.getItem("fileTree");

export interface FileState {
  selectedFile: IFileTree | null;
  fileTree: IFileTree;
  fileTabs: IFileTree[];
  ActiveLink: IFileTree | null;
}

const initialState: FileState = {
  selectedFile: null,
  fileTree: savedTree ? JSON.parse(savedTree) : FileTree,
  fileTabs: [],
  ActiveLink: null,
};

export const fileSlice = createSlice({
  name: "FileSlice",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<IFileTree | null>) => {
      state.selectedFile = action.payload;
    },

    addFileToSrc: (
      state,
      action: PayloadAction<{ name: string; extension: string }>
    ) => {
      const alowedExtensions = ["js", "html", "css"];
      if (!alowedExtensions.includes(action.payload.extension)) {
        alert("Invalid file extension");
        return;
      }
      const addToSrc = (node: IFileTree): IFileTree => {
        if (node.type === "folder" && node.name === "src") {
          const newChildren = node.children ? [...node.children] : [];
          newChildren.push({
            id: uuidv4(),
            name: action.payload.name,
            type: "file",
            content: "",
          });
          return { ...node, children: newChildren };
        }

        if (node.children) {
          return {
            ...node,
            children: node.children.map(addToSrc),
          };
        }
        return node;
      };
      state.fileTree = addToSrc(state.fileTree);
      sessionStorage.setItem("fileTree", JSON.stringify(state.fileTree));
    },
    renameFile: (
      state,
      action: PayloadAction<{ id: string; newName: string; extension: string }>
    ) => {
      const renameById = (node: IFileTree): IFileTree => {
        if (node.id === action.payload.id) {
          return { ...node, name: action.payload.newName };
        }

        if (node.children) {
          return {
            ...node,
            children: node.children.map(renameById),
          };
        }

        return node;
      };

      state.fileTree = renameById(state.fileTree);
      sessionStorage.setItem("fileTree", JSON.stringify(state.fileTree));
      // ✅ Update fileTabs too
      const tabIndex = state.fileTabs.findIndex(
        (tab) => tab.id === action.payload.id
      );
      if (tabIndex !== -1) {
        state.fileTabs[tabIndex].name = action.payload.newName;
      }
    },
    setFileTaps: (state, action: PayloadAction<IFileTree>) => {
      const existFile = state.fileTabs.some(
        (file) => file.id == action.payload.id
      );
      if (!existFile) {
        state.fileTabs = [...state.fileTabs, action.payload];
      }
    },
    removeFileTab: (state, action: PayloadAction<string>) => {
      const filtered = state.fileTabs.filter((f) => f.id !== action.payload);
      const active = filtered[filtered.length - 1];
      state.fileTabs = filtered;
      if (active) {
        state.ActiveLink = active;
      } else {
        state.ActiveLink = null;
      }
    },

    setActiveLink: (state, action: PayloadAction<IFileTree>) => {
      state.ActiveLink = action.payload;
    },
    updateActiveFileContent: (state, action: PayloadAction<string>) => {
      if (state.ActiveLink) {
        // 1. Update ActiveLink content
        state.ActiveLink.content = action.payload;

        // 2. Update fileTree recursively
        const updateById = (node: IFileTree): IFileTree => {
          if (node.id === state.ActiveLink?.id) {
            return { ...node, content: action.payload };
          }

          if (node.children) {
            return {
              ...node,
              children: node.children.map(updateById),
            };
          }

          return node;
        };

        state.fileTree = updateById(state.fileTree);
        sessionStorage.setItem("fileTree", JSON.stringify(state.fileTree));

        const tabIndex = state.fileTabs.findIndex(
          (tab) => tab.id === state.ActiveLink?.id
        );
        if (tabIndex !== -1) {
          state.fileTabs[tabIndex].content = action.payload;
        }
      }
    },
    removeFile: (
      state,
      action: PayloadAction<{ id: string}>
    ) => {
      const removeById = (node: IFileTree): IFileTree | null => {
        if (node.id === action.payload.id) {
          return null; 
        }

        if (node.children) {
          const filteredChildren = node.children
            .map(removeById)
            .filter((child): child is IFileTree => child !== null);
          return { ...node, children: filteredChildren };
        }

        return node;
      };

      state.fileTree = removeById(state.fileTree) || initialState.fileTree;
      sessionStorage.setItem("fileTree", JSON.stringify(state.fileTree));

    
      state.fileTabs = state.fileTabs.filter(
        (tab) => tab.id !== action.payload.id
      );
      if (state.ActiveLink?.id === action.payload.id) {
        state.ActiveLink = null; 
      }
    },
  },
});

export const {
  setSelectedFile,
  addFileToSrc,
  renameFile,
  setFileTaps,
  setActiveLink,
  updateActiveFileContent,
  removeFileTab,
  removeFile,
} = fileSlice.actions;

export default fileSlice.reducer;
