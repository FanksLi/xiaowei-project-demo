

interface Props {
    className?: string;
}

export default function Setting(props: Props): React.ReactElement { 
    const { className } = props;
    return <div className={className}>
        Setting
    </div>
}