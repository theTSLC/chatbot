import OpenAI from "openai";
import { getAssistantId, updateAssistantId } from "./database";
const secretKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: secretKey,
});


export const createAssistant = async () => {
  let assistantId;
  try {
    assistantId = await getAssistantId();
  } catch (error) {
    console.error("Error reading assistant ID file:", error);
    console.log("Creating a new assistant...");
  }

  if (!assistantId) {
    try {
      const assistantInstance = await openai.beta.assistants.create({
        instructions: "Woof woof",
        name: "Wishbone, the helpful Chatdog",
        tools: [{ type: "retrieval" }],
        model: "gpt-3.5-turbo-1106",
      });

      await updateAssistantId(assistantInstance.id);
      return assistantInstance;
    } catch (error) {
      console.error("Error creating assistant:", error);
      throw error;
    }
  } else {
    return { id: assistantId };
  }
};

export const createThread = async (threadId: string | undefined) => {
  try {
    if (threadId) {
      return await openai.beta.threads.retrieve(threadId);
    }
    return await openai.beta.threads.create();
  } catch (error) {
    console.error("Error creating/retrieving thread:", error);
    throw error;
  }
};

export const getMessagesForThread = async (threadId: string) => {
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    return messages;
  } catch (error) {
    console.error("Error getting messages for thread:", error);
    throw error;
  }
};

export const addMessageToThread = async (threadId: string, question: string) => {
  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: question,
    });
  } catch (error) {
    console.error("Error adding message to thread:", error);
    throw error;
  }
};

export const createRun = async (assistantId: string, threadId: string) => {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    return run;
  } catch (error) {
    console.error("Error creating run:", error);
    throw error;
  }
};

export const statusOfRun = async (threadId: string, runId: string) => {
  try {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    return runStatus.status;
  } catch (error) {
    console.error("Error retrieving run status:", error);
    throw error;
  }
};

export const createThreadAndRun = async (threadId: string | undefined, question: string) => {
  try {
    const myAssistant = await createAssistant();
    const thread = await createThread(threadId);
    await addMessageToThread(thread.id, question);
    const run = await createRun(myAssistant.id, thread.id);
    return { run, thread };
  } catch (error) {
    console.error("Error in createThreadAndRun:", error);
    throw error;
  }
};
