"use client";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import useChat from "@/components/chat/useChat";
import Action from "fast-jsx/layout/template/Action";
import { useActionStore } from "fast-jsx/store";
import MessageMolecule from "./molecule/Message.molecule";
import useSign from "@/hook/useSIgn";

export default function Chat() {
  const [text, setText] = useState<string>();
  const { setModal } = useActionStore();
  const { messages, setMessage, postChat } = useChat();
  const { isLoading, isSignIn } = useSign();
  const container = {
    positions: "relative",
    sizes: "w-full min-h-screen",
    pressures: "pt-1 px-1.5",
  };
  const body = {
    displays: "flex flex-col gap-y-3.5",
    sizes: "w-full h-92 xs:h-100 sm:h-120 md:h-160",
    styles: "overflow-y-scroll",
    boundaries: "border-4 rounded-md p-3.5 border-[#023076]",
  };
  useEffect(() => {
    if (!isSignIn && !isLoading) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
    }
  }, [isSignIn, isLoading]);
  return (
    <Action.Show
      actions={[
        [
          "setting",
          <Modal
            key="setting"
            titles={{
              title: "설정",
              subtitle: "",
            }}
            option={{
              height: "lg",
            }}
          >
            <div>asfd</div>
          </Modal>,
        ],
      ]}
    >
      <div className={cn(container)}>
        <Button
          title="설정"
          onClick={() => setModal("setting")}
          option={{
            width: "w-12",
            height: "h-12",
            font: "text-lg",
            position: "absolute top-1.5 right-1.5",
          }}
        />
        <div className={cn(body)}>
          {messages.map((message) => (
            <MessageMolecule
              key={message.text}
              message={message.text}
              option={{
                isMine: message.user === "user",
              }}
            />
          ))}
        </div>
        <div className="fixed left-0 bottom-0 w-full px-1.5 pb-3.5">
          <Input
            state={[text, setText]}
            option={{
              height: "h-20",
              font: "text-2xl",
              boundary: "border-4 rounded-md border-[#023076]",
            }}
            placeholder="Enter를 눌러 메시지를 전송하세요!"
            onKeyDown={(e) => {
              if (!text) return;
              if (e.key === "Enter") {
                setMessage({
                  user: "user",
                  text,
                });
                postChat(text);
                return setText("");
              }
            }}
          />
        </div>
      </div>
    </Action.Show>
  );
}
