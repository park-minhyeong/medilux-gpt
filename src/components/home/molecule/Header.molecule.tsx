import { cn } from "fast-jsx/util";
import Image from "next/image";

export default function HeaderMolecule() {
  const container = {
    positions: "absolute top-0 left-0",
  };
  const body = {
    boundaries: "pl-5",
    displays: "flex items-center gap-x-3.5",
    fonts: "text-white text-3xl",
  };
  return (
    <div className={cn(container)}>
      <div className={cn(body)}>
        <div>Supported By</div>
        <Image
          src="/images/blue-signum.svg"
          alt="blue-signum"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
