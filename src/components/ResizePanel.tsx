import type { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface IResizePanelProps {
    defaultLayout?: number[] | undefined;
    leftPanel: ReactNode;
    rightPanel: ReactNode;
}

function ResizePanel({leftPanel ,rightPanel,defaultLayout = [25, 67] }: IResizePanelProps) {

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <>
      <PanelGroup direction="horizontal" onLayout={onLayout}>
        <Panel defaultSize={defaultLayout[0]}>
          {leftPanel}
        </Panel>
        <PanelResizeHandle />
        
        <Panel defaultSize={defaultLayout[1]}>
          {rightPanel}
        </Panel>
      </PanelGroup>
    </>
  );
}

export default ResizePanel;
