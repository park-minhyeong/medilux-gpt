"use client";
import Image from "next/image";
import { cn } from "fast-jsx/util";
import { Button, Input, Modal, Shelf } from "fast-jsx";
import { useActionStore } from "fast-jsx/store";
import useSign from "@/hook/useSIgn";
import { useState, KeyboardEvent } from "react";
import HeaderMolecule from "@/components/home/molecule/Header.molecule";
import FooterMolecule from "@/components/home/molecule/Footer.molecule";

export default function Home() {
  const { setModal } = useActionStore();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { signIn } = useSign();
  const body = {
    displays: "flex flex-col items-center",
    width: "w-full max-w-3xl",
  };
  const handleSignIn = (e: KeyboardEvent<Element>) => {};
  return (
    <Shelf.Center
      action={{
        shows: [
          [
            "signIn",
            <Modal
              key="signIn"
              titles={{
                title: "시작하기",
                subtitle: "로그인을 해주세요",
              }}
              option={{
                height: "lg",
              }}
            >
              <Shelf.Col>
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
                <Button
                  title="로그인"
                  onClick={() => {
                    if (!username || !password) return;
                    signIn({ username, password });
                  }}
                  option={{
                    pressure: "mt-28",
                    height: "h-12",
                    background: "bg-[#023076]",
                  }}
                />
              </Shelf.Col>
            </Modal>,
          ],
        ],
      }}
      option={{
        background: "bg-[#023076]",
      }}
    >
      <div className={cn(body)}>
        <Image
          src={"/images/medilux-blue.png"}
          alt={"medilux"}
          width={450}
          height={450}
        />
        <div className="flex flex-col items-center text-white">
          <div className="text-3xl">기업프로젝트 4조</div>
          <div>~정신과 진료 두려움 해소 솔루션~</div>
        </div>
      </div>
      <Button
        title="시작하기"
        onClick={() => setModal("signIn")}
        option={{
          width: "w-48",
          height: "h-12",
          font: "text-xl",
          textColor: "text-[#023076] hover:text-white",
          background: "bg-white hover:bg-transparent",
          boundary: "border-white border-2 rounded-md duration-500",
        }}
      />
      <HeaderMolecule />
      <FooterMolecule />
    </Shelf.Center>
  );
}
