"use client"
import React, { useEffect } from 'react';
import ChatHeader from './_components/ChatHeader';
import MessageWindow from './_components/MessageWindow';
import InputArea from './_components/InputArea';
import { useChatbotContext } from './_contexts/ChatbotProvider';
import axios from 'axios';

export default function Home() {
  const { isLoading, setIsLoading, runId, threadId } = useChatbotContext();

  useEffect(() => {
    let intervalId: any;

    const checkStatus = async () => {
      try {
        const response = await axios.get(`/api/status?threadId=${threadId}&runId=${runId}`);
        if (response.data.status === 'completed') {
          setIsLoading(false); // Stop loading when status is complete
          // Optionally, handle message display here if needed
        } else if (response.data.status === 'failed') {
          setIsLoading(false); // Stop loading on failure
          // Display error message
          alert('Oops! Something went wrong. Please try again later.'); // Todo, clean
        }
      } catch (error) {
        console.error('Error checking status:', error);
        setIsLoading(false); // Stop loading on error
        alert('An error occurred while checking the status. Please try again later.'); // Todo, clean
      }
    };

    if (isLoading && runId && threadId) {
      intervalId = setInterval(checkStatus, 3000); // Poll every 3 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading, runId, threadId, setIsLoading]);

  return (
    <main id="chatbot-openai" className="w-screen h-screen bg-white shadow-lg overflow-hidden flex flex-col">
      <ChatHeader></ChatHeader>
      <MessageWindow></MessageWindow>
      {isLoading && <LoadingSpinner />}
      <InputArea></InputArea>
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
