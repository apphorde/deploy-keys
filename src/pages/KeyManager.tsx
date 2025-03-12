
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { KeysList } from '@/components/keys/KeysList';

const KeyManager = () => {
  return (
    <ProtectedLayout>
      <div className="max-w-5xl mx-auto">
        <KeysList />
      </div>
    </ProtectedLayout>
  );
};

export default KeyManager;
