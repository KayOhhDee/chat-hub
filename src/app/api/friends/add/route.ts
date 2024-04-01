import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendSchema } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = addFriendSchema.parse(body.email);

    const idToAdd = (await fetchRedis("get", `user:email:${email}`)) as string;

    if (!idToAdd) {
      return new Response("User does not exist", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You can't add yourself as a friend", {
        status: 400,
      });
    }

    const isAleadyExists = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAleadyExists) {
      return new Response("Friend request already exists", { status: 400 });
    }

    const isAleadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAleadyFriends) {
      return new Response("Friend request already exists", { status: 400 });
    }

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    } else {
      return new Response("An error occurred", { status: 500 });
    }
  }
}
