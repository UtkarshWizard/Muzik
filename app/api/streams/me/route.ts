import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest) {
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

      const streams = await prismaClient.stream.findMany({
        where: {
            userId: user.id
        }, include: {
          _count: {
            select: {
              upvotes: true
            }
          },
          upvotes: {
            where: {
              userId: user.id
            }
          }
        }
      })

      return NextResponse.json({
        streams: streams.map(({_count, ...rest}) => ({
          ...rest,
          upvotesCount: _count.upvotes,
          haveUpVoted: rest.upvotes.length ? true : false
        }))
      })
}