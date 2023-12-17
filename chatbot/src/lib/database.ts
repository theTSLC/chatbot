import { sql } from "@vercel/postgres";

export const getAssistantId = async (): Promise<string | undefined> => {
  const { rows } = await sql`SELECT * from Assistants LIMIT 1`;
  if (rows && rows.length === 1) {
    return rows[0].id;
  } else {
    return undefined;
  }
};

export const updateAssistantId = async (assistantId: string) => {
  await sql`INSERT INTO Assistants (id) VALUES (${assistantId});`;
  return;
};