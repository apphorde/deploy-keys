
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { useAuthContext } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/lib/keyManager';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { keys } = useApiKeys();

  return (
    <ProtectedLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name?.split(' ')[0]}</h1>
            <p className="text-muted-foreground mt-1">
              Manage your API keys and monitor their usage.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link to="/keys">View All Keys</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{keys.length}</p>
              <p className="text-muted-foreground text-sm mt-2">Active keys in your account</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {keys.filter(key => key.lastUsed).length}
              </p>
              <p className="text-muted-foreground text-sm mt-2">Keys with recent usage</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">Active</p>
              <p className="text-muted-foreground text-sm mt-2">Your account is in good standing</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Recent API Keys</h2>
            <Button variant="ghost" asChild>
              <Link to="/keys">View All</Link>
            </Button>
          </div>

          {keys.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-medium mb-2">No API keys yet</h3>
                <p className="text-muted-foreground mb-4">Create your first API key to get started.</p>
                <Button asChild>
                  <Link to="/keys">Create API Key</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {keys.slice(0, 4).map((key) => (
                <Card key={key.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="truncate">{key.name}</span>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(key.created).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="font-mono text-sm bg-muted p-2 rounded-md overflow-hidden text-ellipsis">
                      {`${key.value.substring(0, 8)}...${key.value.substring(key.value.length - 4)}`}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;
