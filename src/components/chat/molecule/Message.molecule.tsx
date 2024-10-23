import { cn } from "fast-jsx/util";

interface MessageProps {
  message: string;
  option?: {
    isMine?: boolean;
  };
}
export default function MessageMolecule(props: MessageProps) {
  const { message, option } = props;
  const container = {
    displays: "flex",
    where: option?.isMine ? "justify-end" : "justify-start",
  };
  const body = {
    backgrounds: "bg-white",
    pressures: "p-3.5",
    width: "w-full max-w-100",
    styles: "border-2",
    radius: !option?.isMine
      ? "rounded-br-xl rounded-t-xl"
      : "rounded-bl-xl rounded-t-xl",
  };
  return (
    <div className={cn(container)}>
      <div className={cn(body)}>{message}</div>
    </div>
  );
}