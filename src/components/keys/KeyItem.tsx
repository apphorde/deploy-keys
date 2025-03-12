
import { ApiKey, useApiKeys } from '@/lib/keyManager';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface KeyItemProps {
  apiKey: ApiKey;
  onDelete: () => void;
}

export function KeyItem({ apiKey, onDelete }: KeyItemProps) {
  const { copyKeyToClipboard } = useApiKeys();
  const [showKey, setShowKey] = useState(false);
  const [copying, setCopying] = useState(false);

  // Format the API key for display
  const formatApiKey = (key: string) => {
    if (showKey) return key;
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  };

  // Format the creation date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleCopy = async () => {
    setCopying(true);
    const success = await copyKeyToClipboard(apiKey.value);
    if (success) {
      toast.success('API key copied to clipboard');
    } else {
      toast.error('Failed to copy API key');
    }
    setCopying(false);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{apiKey.name}</span>
        </CardTitle>
        <CardDescription>Created {formatDate(apiKey.created)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 font-mono text-sm bg-muted p-2 rounded-md overflow-x-auto">
          <span className={cn(showKey ? '' : 'font-bold')}>{formatApiKey(apiKey.value)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto flex-shrink-0 h-8 px-2 text-xs"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? 'Hide' : 'Show'}
          </Button>
        </div>
        {apiKey.lastUsed && (
          <p className="text-xs text-muted-foreground mt-2">
            Last used: {formatDate(apiKey.lastUsed)}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="secondary"
          size="sm"
          className="transition-all duration-300"
          onClick={handleCopy}
          disabled={copying}
        >
          {copying ? 'Copying...' : 'Copy'}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="animate-scale-in">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete API Key</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this API key? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
