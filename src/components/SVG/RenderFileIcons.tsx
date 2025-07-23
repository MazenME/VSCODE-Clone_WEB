import ImgIcon from "../ImgIcon";

interface RenderIconProps {
  fileName: string;
  type: string;
  isOpen?: boolean;
}

function RenderFileIcon({ fileName, type, isOpen }: RenderIconProps) {
  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  const iconFileMap: Record<string, string> = {
    js: "/icons/javascript",
    ts: "/icons/typescript",
    jsx: "/icons/react",
    tsx: "/icons/react",
    html: "/icons/html",
    css: "/icons/css",
    json: "/icons/json",
    md: "/icons/markdown",
    png: "/icons/image",
    jpg: "/icons/image",
    jpeg: "/icons/image",
    gif: "/icons/image",
    txt: "/icons/text",
    gitignore: "/icons/git",
    // folders
    VSCodeClone: "/icons/folder-vscode",
    node_modules: "/icons/folder-node",
    src: "/icons/folder-src",
    components: "/icons/folder-components",
    styles: "/icons/folder-stylus",
    SVG: "/icons/folder-svg",
    Pages: "/icons/folder-pages",
    public: "/icons/folder-public",
    assets: "/icons/folder-assets",
    config: "/icons/folder-config",
  };

  const iconKey = type === "folder" ? fileName : fileExtension;

  const iconSrc = iconKey && iconFileMap[iconKey]
    ? `${iconFileMap[iconKey]}${type === "folder" && isOpen ? "-open" : ""}.svg`
    : type === "folder"
    ? `/icons/folder${isOpen ? "-default-open" : "-default"}.svg`
    : "/icons/file.svg";
  return <ImgIcon src={iconSrc} alt={`${fileName} icon`}  className="w-[22px] h-[22px]"/>;
}


export default RenderFileIcon;
