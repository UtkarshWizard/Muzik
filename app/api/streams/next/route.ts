import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  //replace this with id everywhere and get rid of db call here.
  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 411,
      }
    );
  }

  const mostUpvotedStream = await prismaClient.stream.findFirst({
    where: {
      userId: user.id,
      played: false
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  await Promise.all([
    prismaClient.currentStream.upsert({
      where: {
        userId: user.id,
      },
      update: {
        userId: user.id,
        streamId: mostUpvotedStream?.id,
      },
      create: {
        userId: user.id,
        streamId: mostUpvotedStream?.id,
      },
    }),
    prismaClient.stream.update({
      where: {
        id: mostUpvotedStream?.id ?? "",
      },
      data: {
        played: true,
        playedTime: new Date()
      }
    }),
  ]);

  return NextResponse.json({
    stream: mostUpvotedStream
  })
}
