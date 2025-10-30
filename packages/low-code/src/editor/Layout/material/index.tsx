import { ComponentItem } from "@/editor/common";
import { useStore } from "@/store";

interface Props {
    className?: string;
}

export default function Material(props: Props): React.ReactElement { 
    const { className } = props;
   const { addComponent } = useStore();

    function onDragEnd(item: { name: string; description: string; props: Record<string, any>, parentId?: number }) {
        const element = {
            id: Date.now(),
            name: item.name,
            props: item.props,
        };

        addComponent(element, item.parentId);


    }
    return <div className={`${className} flex p-4 gap-2`}>
        <ComponentItem name="Button" description="按钮" onDragEnd={onDragEnd} />
        <ComponentItem name="Space" description="间隔" onDragEnd={onDragEnd} />
    </div>
}