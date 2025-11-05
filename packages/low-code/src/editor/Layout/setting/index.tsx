import { Segmented } from "antd";
import { useState } from "react";
import Attribute from "./Attribute";

interface Props {
    className?: string;
}

const options = [
    { label: '属性', value: 1 },
    { label: '样式', value: 2 },
];
export default function Setting(props: Props): React.ReactElement { 
    const { className } = props;
    const [active, setActive] = useState(1);

    function handleChange(value: number) { 
        setActive(value);
    }
    return <div className={className}>
        <Segmented options={options} block onChange={handleChange} value={active} />
        <div>
            {active === 1 ? <Attribute /> : null}
        </div>
    </div>
}