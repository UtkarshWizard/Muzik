// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ArrowUpIcon, ArrowDownIcon, PlayIcon } from 'lucide-react';

// type Song = {
//   id: string;
//   type: string;
//   active: boolean;
//   extractedId: string;
//   title: string;
//   smallImg: string;
//   bigImg: string;
//   userId: string;
//   upvotes: [];
//   upvotesCount: number;
//   url: string;
//   haveUpVoted: boolean;
// };

// export function SongQueue({
//   songs,
//   onVote,
//   onPlay,
// }: {
//   songs: Song[];
//   onVote: (id: string, direction: "up" | "down") => void;
//   onPlay: (videoId: string) => void;
// }) {
//   return (
//     <div className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold text-white">Upcoming Songs</h2>
//       <ul className="space-y-4">
//         {songs.map((song) => (
//           <li
//             key={song.id}
//             className="flex items-center justify-between p-3 bg-white/20 backdrop-blur-md rounded-lg shadow-md transition-all hover:bg-white/30"
//           >
//             <div className="flex items-center space-x-4">
//               <Image
//                 src={song.smallImg}
//                 alt={song.title}
//                 width={120}
//                 height={90}
//                 className="rounded-md"
//               />
//               <span className="font-medium text-white">{song.title}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               {song.haveUpVoted ? (
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => onVote(song.id, "down")}
//                   className="bg-blue-500/50 hover:bg-blue-500/70 text-white border-transparent"
//                 >
//                   <ArrowDownIcon className="h-4 w-4 mr-1" />
//                   {song.upvotesCount}
//                 </Button>
//               ) : (
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => onVote(song.id, "up")}
//                   className="bg-pink-500/50 hover:bg-pink-500/70 text-white border-transparent"
//                 >
//                   <ArrowUpIcon className="h-4 w-4 mr-1" />
//                   {song.upvotesCount}
//                 </Button>
//               )}
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => onPlay(song.extractedId)}
//                 className="bg-green-500/50 hover:bg-green-500/70 text-white border-transparent"
//               >
//                 <PlayIcon className="h-4 w-4" />
//               </Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, PlayIcon } from 'lucide-react';

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

export function SongQueue({
  songs,
  onVote,
  onPlay,
  isCreator,
}: {
  songs: Song[];
  onVote: (id: string, direction: "up" | "down") => void;
  onPlay: (videoId: string) => void;
  isCreator: boolean
}) {
  return (
    <div className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg relative">
      <h2 className="text-2xl font-bold text-white pr-12">Upcoming Songs</h2>
      {songs.length > 0 && isCreator &&(
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPlay(songs[0].extractedId)}
          className="absolute top-4 right-4 mb-4 bg-green-500/50 hover:bg-green-500/70 text-white border-transparent"
        >
          <PlayIcon className="h-4 w-4" />Play Next
        </Button>
      )}
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between p-3 bg-white/20 backdrop-blur-md rounded-lg shadow-md transition-all hover:bg-white/30"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={song.smallImg}
                alt={song.title}
                width={120}
                height={90}
                className="rounded-md"
              />
              <span className="font-medium text-white">{song.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              {song.haveUpVoted ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onVote(song.id, "down")}
                  className="bg-blue-500/50 hover:bg-blue-500/70 text-white border-transparent"
                >
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  {song.upvotesCount}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onVote(song.id, "up")}
                  className="bg-pink-500/50 hover:bg-pink-500/70 text-white border-transparent"
                >
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  {song.upvotesCount}
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}





