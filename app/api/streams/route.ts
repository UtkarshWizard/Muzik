import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
// @ts-ignore
import youtubesearchapi from "youtube-search-api";
import { getServerSession } from "next-auth";

var YT_REGEX =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const createStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = createStreamSchema.parse(await req.json());
    const isYt = data.url.match(YT_REGEX);
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong url",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];
    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );
    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can't find Video",
        smallImg:
          thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url ??
              "https://shorturl.at/G3zuK",
        bigImg:
          thumbnails[thumbnails.length - 1].url ?? "https://shorturl.at/G3zuK",
      },
    });

    return NextResponse.json({
      ...stream,
      hasUpVoted: false,
      upvotesCount: 0,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error While adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
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
  if (!creatorId) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 411,
      }
    );
  }

  const [streams , activeStream] = [await prismaClient.stream.findMany({
    where: {
      userId: creatorId,
      played: false
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: user.id,
        },
      },
    },
  }), await prismaClient.currentStream.findFirst({
    where: {
        userId: creatorId
    }, include: {
        stream: true
    }
  })]

  return NextResponse.json({
    streams: streams.map(({ _count, ...rest }) => ({
      ...rest,
      upvotesCount: _count.upvotes,
      haveUpVoted: rest.upvotes.length ? true : false,
    })),
    activeStream
  });
}
