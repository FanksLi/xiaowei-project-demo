import { SettingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import VariableModal from "./VariableModal";


interface Props {
    value?: any;
    onChange?: (value: any) => void;
    clssName?: string;
}

export default function SettingFormItem(props: Props) {
    const { value, onChange } = props;
    const [open, setOpen] = useState(false);

    function handleChange(type: number, v: any) { 
        const data = {};
        if(type === 1) {
            Object.assign(data, {
                type: 'static',
                value: v,
            });
        } else if(type === 2) {
            Object.assign(data, {
                type: 'variable',
                key: v.name,
                value: v.defaultValue,
                id: v.id,
            });
        }
        onChange?.(data);
    }

    return <div className="flex items-center gap-2">
        <Input value={value?.key} onChange={(e: any) => handleChange(1, e.target.value)} disabled={value?.type === 'variable'} />
        <SettingOutlined onClick={() => setOpen(true)} />
        <VariableModal open={open} onClose={() => setOpen(false)} onOk={() => setOpen(false)} onSelect={(value) => handleChange(2, value)} />
    </div>
}