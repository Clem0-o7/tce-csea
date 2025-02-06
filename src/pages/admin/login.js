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

  useEffect(() => {
    // Wait until NextAuth finishes loading
    if (status === 'loading') return;

    // If the user is authenticated, redirect them to the dashboard
    if (status === 'authenticated') {
      router.replace('/admin/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      console.log('Sign in result:', result);

      // If there is an error returned by signIn, display it; otherwise redirect
      if (result.error) {
        setError(result.error);
      } else {
        router.replace('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  // While the session is being determined, show a loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If unauthenticated, display the login form
  if (status === 'unauthenticated') {
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
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
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

  // In any other case, render nothing
  return null;
}
