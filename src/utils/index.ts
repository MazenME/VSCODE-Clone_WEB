import type { IFileTree } from "../interfaces";

export function getLanguageFromFileName(fileName: string): string {
  const ext = fileName.split(".").pop();
  switch (ext) {
    case "html":
      return "html";
    case "css":
      return "css";
    case "js":
      return "javascript";
    default:
      return "plaintext";
  }
}

export function getFileByExtension(fileTabs: IFileTree[], ext: string) {
  return fileTabs.find((file:IFileTree) => file.name.endsWith(ext))?.content || "";
}

