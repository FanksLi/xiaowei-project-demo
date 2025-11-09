import Edit from "./Edit";

interface Props {
  className?: string;
}

export default function Stage(props: Props): React.ReactElement {
  const { className } = props;
  return <Edit className={className} />;
}
