"use client";
// import ChatHeader from "./_components/ChatHeader";
// import MessageWindows from "./_components/MessageWindow";
// import InputArea from "./_components/InputArea";
import { useEffect } from "react";
import { mutate } from "swr";

export default function Home() {
  
  return (
    <main
      id="chatbot-openai"
      className="w-screen h-screen bg-white shadow-lg overflow-hidden flex flex-col"
    >
      {/* <ChatHeader></ChatHeader>
      <MessageWindows></MessageWindows>
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <InputArea></InputArea> */}
    </main>
  );
}

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
    </div>
  );
};