import Header from "./header";
import Material from "./material";
import Stage from "./stage";
import Setting from "./setting";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function Layout(): React.ReactElement {
  return (
    <div className="h-full w-full flex flex-col">
      <Header className="h-[60px] bg-amber-100" />
      <Allotment className="flex-1 flex h-full">
        <Allotment.Pane minSize={200} maxSize={400} preferredSize={200}>
          <Material className="h-full" />
        </Allotment.Pane>
        <Allotment.Pane>
          <Stage className="flex-1 h-full" />
        </Allotment.Pane>
        <Allotment.Pane minSize={400} maxSize={600} preferredSize={200}>
          <Setting className=" h-full" />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
