import StreamView from "../components/StreamView";

const creatorId = "d3344108-b049-4138-9595-430b00936c23"

export default function Dashboard() {
  return <StreamView creatorId={creatorId} isCreator={true} playVideo={true} />
}
