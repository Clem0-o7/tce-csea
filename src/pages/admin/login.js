import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme } = useTheme();

  // Handle redirect if already authenticated
  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'authenticated') {
      const redirect = router.query.callbackUrl || '/admin/dashboard';
      router.replace(redirect);
    }
  }, [status, router]);

  // Reset error when inputs change
  useEffect(() => {
    if (error) setError('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        return;
      }

      // Get callback URL from query params or use default
      const callbackUrl = router.query.callbackUrl || '/admin/dashboard';

      const result = await signIn('credentials', {
        username: username.trim(),
        password: password.trim(),
        redirect: false,
        callbackUrl
      });

      if (!result) {
        throw new Error('Authentication failed');
      }

      if (result.error) {
        // Handle specific error messages
        switch (result.error) {
          case 'CredentialsSignin':
            setError('Invalid username or password');
            break;
          case 'AccessDenied':
            setError('Access denied. Please contact administrator.');
            break;
          default:
            setError(result.error || 'Failed to sign in');
        }
        return;
      }

      if (result.ok) {
        // Clear form
        setUsername('');
        setPassword('');
        
        // Redirect with fallback
        try {
          await router.push(result.url || callbackUrl);
        } catch (routerError) {
          console.error('Navigation failed:', routerError);
          window.location.href = callbackUrl; // Fallback redirect
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Hide form if authenticated
  if (status === 'authenticated') {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 placeholder-gray-400 text-white'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 placeholder-gray-400 text-white'
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className={`rounded-md p-4 ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'}`}>
              <div className={`text-sm ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}>
                {error}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </span>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}