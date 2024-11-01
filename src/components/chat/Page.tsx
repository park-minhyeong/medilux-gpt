"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "fast-jsx";
import { cn } from "fast-jsx/util";
import useChat from "@/components/chat/useChat";
import Action from "fast-jsx/layout/template/Action";
import { useActionStore } from "fast-jsx/store";
import MessageMolecule from "./molecule/Message.molecule";
import useSign from "@/hook/useSIgn";
import toXlsx from "@/util/toXlsx";
import { Message } from "@/interface/Gpt";
import { results } from "@/asset/test";

export default function Chat() {
  const [text, setText] = useState<string>();
  const { clearModal, setModal } = useActionStore();
  const {
    messages,
    setMessage,
    setMessages,
    postChat,
    clearMessages,
    setPrompt,
    prompt,
  } = useChat();
  const { isLoading, isSignIn } = useSign();
  const container = {
    positions: "relative",
    sizes: "w-full min-h-screen",
    pressures: "pt-1 px-1.5",
  };
  const body = {
    displays: "flex flex-col gap-y-3.5",
    sizes: "w-full h-92 xs:h-100 sm:h-120 md:h-220",
    styles: "overflow-y-scroll",
    boundaries: "border-4 rounded-md p-3.5 border-[#023076]",
  };
  useEffect(() => {
    if (!isSignIn && !isLoading) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
    }
  }, [isSignIn, isLoading]);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Action.Show
      actions={[
        [
          "load",
          <Modal
            key="load"
            titles={{
              title: "불러오기",
              subtitle: "테스트 데이터를 불러옵니다.",
            }}
          >
            <div className="w-full flex justify-between">
              {results.map((result) => (
                <Button
                  key={result.name}
                  title={result.name}
                  onClick={() => {
                    const prompt = result.messages.find(
                      (message) => message.role === "system"
                    )?.content;
                    if (!prompt) return;
                    setPrompt(prompt);
                    setMessages(
                      result.messages.filter(
                        (message) => message.role !== "system"
                      )
                    );
                    clearModal();
                  }}
                  option={{
                    background: "bg-green-dark",
                  }}
                />
              ))}
            </div>
          </Modal>,
        ],
        [
          "setting",
          <Modal
            key="setting"
            titles={{
              title: "Prompting",
              subtitle: "텍스트 변경시 자동 저장",
            }}
            option={{
              height: "2xl",
            }}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={cn({
                sizes: "w-full h-72",
                styles: "border-2 border-[#023076] rounded-md p-3.5",
              })}
            />
          </Modal>,
        ],
      ]}
    >
      <div className={cn(container)}>
        <Button
          title="결과"
          onClick={() => setModal("load")}
          option={{
            width: "w-12",
            height: "h-12",
            font: "text-lg",
          }}
        />
        <Button
          title="출력"
          onClick={() => {
            const results: Message[] = [
              {
                role: "system",
                content: prompt,
              },
              ...messages,
            ];
            toXlsx({
              data: results.map((message) => ({
                role: message.role,
                content: message.content,
              })),
            });
          }}
          option={{
            width: "w-12",
            height: "h-12",
            font: "text-lg",
            position: "absolute top-1.5 right-28",
          }}
        />
        <Button
          title="초기화"
          onClick={() => clearMessages()}
          option={{
            width: "w-12",
            height: "h-12",
            font: "text-lg",
            position: "absolute top-1.5 right-15",
          }}
        />
        <Button
          title="설정"
          onClick={() => setModal("setting")}
          option={{
            width: "w-12",
            height: "h-12",
            font: "text-lg",
            position: "absolute top-1.5 right-2",
          }}
        />
        <div ref={scrollRef} className={cn(body)}>
          {messages?.map((message) => (
            <MessageMolecule
              key={message.content}
              message={message.content}
              option={{
                isMine: message.role === "user",
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
                  role: "user",
                  content: text,
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
