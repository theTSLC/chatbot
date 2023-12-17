import React, { useEffect, useRef } from "react";
import Message from "./Message";

function Messages({ messages }: { messages: any[] }) {
  const lastMessageRef = useRef<any>(null);

  // Scrolls to the last message whenever the messages update
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {messages.map((m, index) => (
        <Message
          key={index}
          message={m}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        />
      ))}
    </div>
  );
}

export default Messages;