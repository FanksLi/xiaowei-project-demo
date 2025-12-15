import Header from "./header";
import Material from "./material";
import Stage from "./stage";
import Setting from "./setting";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useStore } from "@/store";
import Preview from "./stage/Preview";
import TreeDrawer from "./components/TreeDrawer";
import VariableModal from "@/editor/common/Modals/VariableModal";
import { useState } from "react";

export default function Layout(): React.ReactElement {
  const { mode } = useStore();
  const [open, setOpen] = useState(false);
  const [openVariable, setOpenVariable] = useState(false);

  function handleOpen(v: boolean) { 
    setOpen(v);
  }


  return (
    <div className="h-full w-full flex flex-col">
      <Header className="h-[60px] border-b border-solid border-b-[#ccc]" open={open} handleOpen={handleOpen} openVariable={() => setOpenVariable(true)} />
      {mode === "edit" ? (
        <>
          <Allotment className="flex-1 flex h-full">
            <Allotment.Pane minSize={200} maxSize={400} preferredSize={200}>
              <Material className="h-full" />
            </Allotment.Pane>
            <Allotment.Pane>
              <Stage className="flex-1 h-full" />
            </Allotment.Pane>
            <Allotment.Pane minSize={400} maxSize={600} preferredSize={200}>
              <Setting className="py-4 px-2 h-full" />
            </Allotment.Pane>
          </Allotment>
        </>
      ) : (
        <Preview />
      )}

      <TreeDrawer open={open} handleOpen={handleOpen} />
      <VariableModal open={openVariable} onClose={() => setOpenVariable(false)} onOk={() => setOpenVariable(false)} />
    </div>
  );
}
