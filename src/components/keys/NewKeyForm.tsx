
import { useState } from 'react';
import { useApiKeys } from '@/lib/keyManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface NewKeyFormProps {
  onKeyCreated: () => void;
  onCancel: () => void;
}

export function NewKeyForm({ onKeyCreated, onCancel }: NewKeyFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createKey } = useApiKeys();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      createKey(name.trim());
      toast.success('API key created successfully');
      onKeyCreated();
    } catch (error) {
      toast.error('Failed to create API key');
      console.error('Error creating API key:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-md mb-6">
      <CardHeader>
        <CardTitle>Create New API Key</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder="e.g. Production API Key"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="transition-all duration-300"
                disabled={isSubmitting}
                autoFocus
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!name.trim() || isSubmitting}
            className="transition-all duration-300"
          >
            {isSubmitting ? 'Creating...' : 'Create API Key'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
