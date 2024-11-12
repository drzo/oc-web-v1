import { Link } from 'react-router-dom';
import { Home, LayoutDashboard } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold">OpenCog Web</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}