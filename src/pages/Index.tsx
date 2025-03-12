
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GoogleSignIn } from '@/components/authentication/GoogleSignIn';
import { useAuthContext } from '@/lib/auth';

const Index = () => {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 border-b">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-semibold">KeyMaster</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-8">
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                API Key Management
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Manage API Keys <br /> with Confidence
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              A simple, secure platform for creating and managing API keys for your static site hosting service.
            </p>
            <div className="pt-4 max-w-md">
              <GoogleSignIn />
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center animate-float">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform rotate-3 animate-pulse-subtle"></div>
              <div className="absolute inset-0 glass-panel rounded-2xl p-8 flex items-center justify-center">
                <div className="w-full space-y-4">
                  <div className="h-12 w-full bg-white/50 rounded-md"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-white/50 rounded-md"></div>
                    <div className="h-24 bg-white/50 rounded-md"></div>
                    <div className="h-24 bg-white/50 rounded-md"></div>
                    <div className="h-24 bg-white/50 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border hover:shadow-md transition-all duration-300">
            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m12 8 4 4-4 4" />
                <path d="m8 12h8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Creation</h3>
            <p className="text-muted-foreground">Generate new API keys with a single click and assign them meaningful names.</p>
          </div>
          
          <div className="p-6 rounded-xl border hover:shadow-md transition-all duration-300">
            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Management</h3>
            <p className="text-muted-foreground">Securely view, copy, and delete your API keys with confidence.</p>
          </div>
          
          <div className="p-6 rounded-xl border hover:shadow-md transition-all duration-300">
            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Usage Insights</h3>
            <p className="text-muted-foreground">Track when your API keys were last used to monitor activity.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KeyMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
