import type { ReactNode } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

interface IResizePanelProps {
  defaultLayout?: number[];
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

const COOKIE_KEY = "react-resizable-panels:layout";

function getInitialLayout(defaultLayout: number[]): number[] {
  try {
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith(COOKIE_KEY));
    return saved ? JSON.parse(saved.split("=")[1]) : defaultLayout;
  } catch {
    return defaultLayout;
  }
}

function ResizePanel({
  leftPanel,
  rightPanel,
  defaultLayout = [25, 75],
}: IResizePanelProps) {
  const layout = getInitialLayout(defaultLayout);

  const onLayout = (sizes: number[]) => {
    document.cookie = `${COOKIE_KEY}=${JSON.stringify(sizes)}; path=/;`;
  };

  return (
    <PanelGroup direction="horizontal" onLayout={onLayout}>
      <Panel defaultSize={layout[0]}>{leftPanel}</Panel>
      <PanelResizeHandle />
      <Panel defaultSize={layout[1]}>{rightPanel}</Panel>
    </PanelGroup>
  );
}

export default ResizePanel;
