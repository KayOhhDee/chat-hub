import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { messageSchema } from "@/lib/validations/message";

export async function POST(req: Request) {
  try {
    const { text, chatId } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    const [userId1, userId2] = chatId.split("--");

    if (session.user.id !== userId1 && session.user.id !== userId2) return new Response("Unauthorized", { status: 401 });

    const friendId = session.user.id === userId1 ? userId2 : userId1;

    const friendList = await fetchRedis('smembers', `user:${session.user.id}:friends`) as string[];
    const isFriend = friendList.includes(friendId);

    if (!isFriend) return new Response("Unauthorized", { status: 401 });

    const sender = await fetchRedis('get', `user:${session.user.id}`) as string;
    const parsedSender = JSON.parse(sender) as User;

    const timestamp = Date.now();

    const messageData = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timestamp,
    }

    const message = messageSchema.parse(messageData);

    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message)
    });

    return new Response("OK")
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("An error occurred", { status: 500 });
  }
}