"use client";
import Image from "next/image";
import { cn } from "fast-jsx/util";
import { Button, Shelf } from "fast-jsx";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const body = {
    displays: "flex justify-between",
    width: "w-full max-w-3xl",
    boundary: "border-2",
  };
  return (
    <Shelf.Center
      option={{
        display: "gap-y-7.5",
      }}
    >
      <div className={cn(body)}>
        <Image
          src={"/images/medilux.png"}
          alt={"medilux"}
          width={240}
          height={240}
        />
        <div className="flex flex-col items-center text-blue-navy">
          <div className="text-3xl">기업프로젝트 4조</div>
          <div>~정신과 진료 두려움 해소 솔루션~</div>
        </div>
      </div>
      <Button
        title="시작하기"
        onClick={() => router.push("/chat")}
        option={{ width: "w-48", height: "h-12", font: "text-xl" }}
      />
    </Shelf.Center>
  );
}
