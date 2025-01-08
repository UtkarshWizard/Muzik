import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShareButton({ creatorId }: { creatorId: string }) {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/creator/${creatorId}`;

    if (navigator.share) {
      navigator.share({
        title: 'Music Voting Dashboard',
        url: shareUrl,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Button onClick={handleShare} className="flex items-center gap-2">
      <Share className="w-4 h-4" />
      Share
    </Button>
  );
}
