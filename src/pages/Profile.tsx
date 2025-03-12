
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { useAuthContext } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Successfully signed out');
    navigate('/', { replace: true });
  };

  return (
    <ProtectedLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Your Profile</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Manage your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-background shadow-md bg-muted">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Google Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Your account is connected to Google
                </p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Connected
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="transition-all duration-300 hover:bg-destructive/90"
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default Profile;
