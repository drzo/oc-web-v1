import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}