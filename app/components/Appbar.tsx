"use client";

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Music } from 'lucide-react'
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <div className="flex justify-between w-full">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">Muzik</span>
        </Link>

         <div>
           {!session.data?.user &&<Button onClick={() => signIn()}>
             Sign In
           </Button>}
           {session.data?.user &&<Button onClick={() => signOut()}>
             Sign Out
           </Button>}
         </div>
      </div>
    </header>
  )
}



// import { signIn, signOut, useSession } from "next-auth/react";

// export function Appbar() {
//   const session = useSession();

//   return (
//     <div>
//       <div className="flex justify-between">
//         <div>Muzi</div>

//         <div>
//           {!session.data?.user &&<button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>
//             Sign In
//           </button>}
//           {session.data?.user &&<button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>
//             Sign Out
//           </button>}
//         </div>
//       </div>
//     </div>
//   );
