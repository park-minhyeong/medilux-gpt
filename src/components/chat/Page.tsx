"use client";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import useChat from "@/components/chat/useChat";
import Action from "fast-jsx/layout/template/Action";
import { useActionStore } from "fast-jsx/store";
import MessageMolecule from "./molecule/Message.molecule";

export default function Chat() {
  const [text, setText] = useState<string>();
  const { setModal } = useActionStore();
  const { messages, setMessage, postChat } = useChat();
  const container = {
    positions: "relative",
    sizes: "w-full min-h-screen",
    pressures: "px-1.5",
  };
  const body = {
    displays: "flex flex-col gap-y-3.5",
    sizes: "w-full h-92 xs:h-100 sm:h-120 md:h-200",
    styles: "overflow-y-scroll",
    boundaries: "border-2 rounded-md p-3.5 border-green-dark",
  };
  return (
    <Action.Show
      actions={[
        [
          "setting",
          <Modal
            key="asdf"
            titles={{
              title: "asdf",
            }}
          >
            asdf
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
            }}
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
