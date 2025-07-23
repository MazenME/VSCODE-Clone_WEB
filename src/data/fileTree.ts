import type { IFileTree } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const FileTree: IFileTree = {
  id: uuidv4(),
  name: "VSCodeClone",
  type: "folder",
  children: [
    {
      id: uuidv4(),
      name: "node_modules",
      type: "folder",
      
    },
    {
      id: uuidv4(),
      name: "src",
      type: "folder",
      children: [
        {
          id: uuidv4(),
          name: "components",
          type: "folder",
          children: [
            { id: uuidv4(), name: "SVG", type: "folder" },
            { id: uuidv4(), name: "File.tsx", type: "file",content:"FIle Content .TSX" },
            { id: uuidv4(), name: "Folder.tsx", type: "file",content:"FIle Content .TSX" },
          ],
        },
        { id: uuidv4(), name: "styles", type: "folder" },
        
      ],
    },
    { id: uuidv4(), name: "package.json", type: "file",content:"FIle Content .TSX" },
    { id: uuidv4(), name: "tsconfig.json", type: "file" ,content:"FIle Content .TSX"},
    {
      id: uuidv4(),
      name: ".gitignore",
      type: "file",
      content:"FIle Ignore .TSX"
    },
    {
      id: uuidv4(),
      name: "README.md",
      type: "file",
      content:"FIle Readme .TSX"
    },
  ],
};
