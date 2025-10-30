

interface Props {
    className?: string;
}

export default function Header(props: Props): React.ReactElement { 
    const { className } = props;
    return <div className={className}>
        header
    </div>
}