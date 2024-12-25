```javascript
// pages/about.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function About() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Clean up function to reset state when navigation is complete
    const handleRouteChangeComplete = () => setIsNavigating(false);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const handleClick = () => {
    setIsNavigating(true);
    router.push('/'); // Navigate to home page
  };

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={handleClick} disabled={isNavigating}>
       {isNavigating ? 'Navigating...' : 'Go back to Home'}
      </button>
    </div>
  );
}
```
This improved solution uses `useEffect` to manage state and provides feedback to the user. It also handles the cleanup of the event listener and sets a loading state to prevent multiple navigations.