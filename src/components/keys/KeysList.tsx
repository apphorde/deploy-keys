
import { useApiKeys } from '@/lib/keyManager';
import { KeyItem } from './KeyItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { NewKeyForm } from './NewKeyForm';

export function KeysList() {
  const { keys, deleteKey, loading } = useApiKeys();
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse rounded-lg border p-4">
            <div className="h-5 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-muted rounded w-full mb-4"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const handleKeyCreated = () => {
    setShowNewKeyForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">API Keys</h2>
        <Button
          onClick={() => setShowNewKeyForm(true)}
          className="transition-all duration-300"
          disabled={showNewKeyForm}
        >
          Create New Key
        </Button>
      </div>

      {showNewKeyForm && (
        <div className="animate-slide-in">
          <NewKeyForm onKeyCreated={handleKeyCreated} onCancel={() => setShowNewKeyForm(false)} />
        </div>
      )}

      {keys.length === 0 && !showNewKeyForm ? (
        <EmptyState
          title="No API Keys"
          description="You haven't created any API keys yet. Create one to get started."
          action={
            <Button onClick={() => setShowNewKeyForm(true)}>Create API Key</Button>
          }
          className="min-h-[200px] my-8 bg-muted/50"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {keys.map((key) => (
            <KeyItem
              key={key.id}
              apiKey={key}
              onDelete={() => deleteKey(key.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
