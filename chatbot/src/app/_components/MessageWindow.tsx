// src/app/_component/MessageWindows.tsx
import React from "react";

function MessageWindows() {
  const sortedMessagesByDate:any = []
  return (
    <div className="flex-grow overflow-y-auto p-4">
      <Messages messages={sortedMessagesByDate}></Messages>
    </div>
  );
}

export default MessageWindows;