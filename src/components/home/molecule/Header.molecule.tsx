import { cn } from "fast-jsx/util";

export default function HeaderMolecule() {
  const container = {
    positions: "absolute top-0 left-0",
  };
  const body = {
    boundaries: "p-5",
    fonts: "text-white text-2xl",
  };
  return (
    <div className={cn(container)}>
      <div className={cn(body)}>메디럭스 X 블루시그넘</div>
    </div>
  );
}
