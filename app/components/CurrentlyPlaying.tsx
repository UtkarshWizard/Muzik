import YouTube from "react-youtube";

export function CurrentlyPlaying({ videoId , playVideo , onVideoEnd }: { videoId: string ; playVideo: boolean  ; onVideoEnd: () => void ; }) {
  return (
    <div className="aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-purple-400/50">
      <div className="relative w-full h-full">
        <YouTube
          videoId={videoId}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: playVideo ? 1 : 0,
            },
          }}
          className="absolute top-0 left-0 w-full h-full"
          iframeClassName="w-full h-full"
          onEnd={onVideoEnd}
        />
      </div>
    </div>
  );
}

