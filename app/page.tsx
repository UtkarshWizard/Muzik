import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Vote, Users, Headphones, Radio, Mic2 } from 'lucide-react'
import { Appbar } from './components/Appbar'
import { Redirect } from './components/Redirect'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <Redirect />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Let Your Audience Choose the Soundtrack
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Engage your stream with interactive music voting. Give your viewers the power to shape your stream's atmosphere.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-primary hover:bg-gray-100">Start Streaming</Button>
                <Button  className="bg-white text-black border-white hover:bg-black hover:text-white">
                  How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How StreamTunes Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Mic2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">1. Start Your Stream</h3>
                <p className="text-gray-600">Begin your stream and enable the StreamTunes widget.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Vote className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">2. Viewers Vote</h3>
                <p className="text-gray-600">Your audience votes for the next song to be played.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Headphones className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">3. Music Plays</h3>
                <p className="text-gray-600">The winning song automatically plays on your stream.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Engage Your Audience Like Never Before</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-4">
                  StreamTunes brings a new level of interactivity to your streams. Let your viewers influence the music and create a more engaging experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span>Boost viewer engagement</span>
                  </li>
                  <li className="flex items-center">
                    <Radio className="h-5 w-5 text-primary mr-2" />
                    <span>Access a vast library of music</span>
                  </li>
                  <li className="flex items-center">
                    <Vote className="h-5 w-5 text-primary mr-2" />
                    <span>Real-time voting system</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Live Voting Example</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Song A</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Song B</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Song C</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-pink-600 h-2.5 rounded-full" style={{width: '10%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Revolutionize Your Streams?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join StreamTunes today and give your audience the power to shape your stream's soundtrack.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 StreamTunes. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}