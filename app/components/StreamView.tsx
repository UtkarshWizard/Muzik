"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SongSubmission } from "../components/SongSubmission";
import { SongQueue } from "../components/SongQueue";
import { CurrentlyPlaying } from "../components/CurrentlyPlaying";
import { Appbar } from "../components/Appbar";
import { ShareButton } from "../components/Sharebutton";

const REFRESH_INTERVAL_MS = 10 * 1000;

type Song = {
  id: string;
  type: string;
  active: boolean;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  userId: string;
  upvotes: [];
  upvotesCount: number;
  url: string;
  haveUpVoted: boolean;
};

export default function StreamView({creatorId , isCreator = true , playVideo = true} : {
    creatorId: string,
    isCreator: boolean,
    playVideo: boolean,
}) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  async function fetchStreams() {
    try {
      const res = await axios.get(`/api/streams/?creatorId=${creatorId}`);
      const streams = res.data.streams.map((stream: any) => ({
        id: stream.id,
        type: stream.type,
        active: stream.active,
        url: stream.url,
        extractedId: stream.extractedId,
        title: stream.title || "Untitled Song", // Default title if missing
        upvotes: stream.upvotes,
        upvotesCount: stream.upvotesCount,
        bigImg: stream.bigImg || "", // Default empty thumbnail
        smallImg: stream.smallImg || "",
        userId: stream.userId || "",
        haveUpVoted: stream.haveUpVoted,
      }));
      setSongs(streams.sort((a: any , b:any ) => a.upvotesCount < b.upvotesCount ? 1 : -1));
      setCurrentSong(res.data.activeStream.stream.extractedId)
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  }

  useEffect(() => {
    fetchStreams();
    const interval = setInterval(() => {}, REFRESH_INTERVAL_MS);
  }, []);

  const handleSubmit = async (url: string) => {
    const res = await axios.post("/api/streams" , {
        creatorId: creatorId,
        url: url,
    })
    setSongs((songs) => [...songs, res.data]);
  };

  const handleVote = (id: string, direction: "up" | "down") => {
    setSongs(
      songs
        .map((song) =>
          song.id === id
            ? {
                ...song,
                upvotesCount: song.upvotesCount + (direction === "up" ? 1 : -1),
                haveUpVoted: !song.haveUpVoted,
              }
            : song
        )
        .sort((a, b) => b.upvotesCount - a.upvotesCount)
    );

    fetch(
      direction === "up" ? "/api/streams/upvote" : "/api/streams/downvote",
      {
        method: "POST",
        body: JSON.stringify({
          streamId: id,
        }),
      }
    );
  };

  const handlePlay = async (videoId: string) => {
    const res = await axios.get('/api/streams/next')
    setCurrentSong(res.data.stream.extractedId);
    setSongs(q => q.filter(X => X.id !== res.data.stream.id))
  };

  const handleVideoEnd = async () => {
    if (songs.length > 0) {
      const res = await axios.get('/api/streams/next')
      setCurrentSong(res.data.stream.extractedId);
      setSongs(q => q.filter(X => X.id !== res.data.stream.id))
    }
  }

  return (
    <div>
      <Appbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
        <div className="container mx-auto p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-center text-white">
              Vote For Your Favourite Song
            </h1>
            <ShareButton creatorId={creatorId}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Currently Playing
              </h2>
              {currentSong ? (
                <CurrentlyPlaying videoId={currentSong} playVideo={playVideo} onVideoEnd={handleVideoEnd} />
              ) : (
                <p className="text-white">No song currently playing</p>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Submit a Song
                </h2>
                <SongSubmission onSubmit={handleSubmit} />
              </div>

              <SongQueue
                songs={songs}
                onVote={handleVote}
                onPlay={handlePlay}
                isCreator={isCreator}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
