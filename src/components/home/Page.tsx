"use client";
import Image from "next/image";
import { cn } from "fast-jsx/util";
import { Button, Input, Modal, Shelf } from "fast-jsx";
import { useRouter } from "next/navigation";
import { useActionStore } from "fast-jsx/store";
import useSign from "@/hook/useSIgn";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { setModal } = useActionStore();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { signIn } = useSign();
  const body = {
    displays: "flex justify-between",
    width: "w-full max-w-3xl",
    boundary: "border-2",
  };
  return (
    <Shelf.Center
      action={{
        shows: [
          [
            "signIn",
            <Modal
              key="signIn"
              titles={{
                title: "로그인",
              }}
              option={{
                height: "lg",
              }}
            >
              <Input state={[username, setUsername]} />
              <Input
                state={[password, setPassword]}
                type="password"
                onKeyDown={(e) => {
                  if (!username || !password) return;
                  if (e.key === "Enter") {
                    signIn({ username, password });
                  }
                }}
              />
            </Modal>,
          ],
        ],
      }}
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
        onClick={() => setModal("signIn")}
        option={{ width: "w-48", height: "h-12", font: "text-xl" }}
      />
    </Shelf.Center>
  );
}
