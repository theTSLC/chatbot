// src/app/_components/Message.tsx
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
import React from "react";

const Message = React.forwardRef(
  ({ message }: { message: ThreadMessage }, ref) => (
    <div
      ref={ref}
      className={`clear-both relative overflow-hidden ${
        message.role === "assistant" ? "float-left" : "float-right"
      }`}
    >
      <div
        className={`rounded-lg py-3 px-4 mb-3 ${
          message.role === "assistant"
            ? "bg-gray-200 text-black"
            : "bg-blue-500 text-white"
        }`}
      >
        <p>{message.content[0]?.text?.value)</p>
      </div>
    </div>
  )
);

export default Message;