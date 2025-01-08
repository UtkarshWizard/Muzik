import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SongSubmission({ onSubmit }: { onSubmit: (url: string) => Promise<void> }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(url);
      setUrl('');
    } catch (error) {
      console.error("Error submitting song:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-full items-center space-x-2 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">
      <Input
        type="url"
        placeholder="Paste YouTube URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="bg-white/20 border-transparent focus:border-pink-300 text-white placeholder-white/70"
      />
      <Button disabled={loading} type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">{loading ? 'Adding...' : 'Add to Queue'}</Button>
    </form>
  )
}

