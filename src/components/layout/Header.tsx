import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'customer':
        return '/customer';
      case 'agent':
        return '/agent';
      case 'manager':
        return '/manager';
      default:
        return '/';
    }
  };

  const getRoleBadge = () => {
    if (!user) return null;
    const roleColors = {
      customer: 'bg-secondary text-secondary-foreground',
      agent: 'bg-primary/10 text-primary',
      manager: 'bg-accent/10 text-accent',
    };
    return (
      <span className={cn('px-2 py-1 rounded text-xs font-medium capitalize', roleColors[user.role])}>
        {user.role}
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={isAuthenticated ? getDashboardPath() : '/'} className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-hero">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">SUD Life</h1>
            <p className="text-xs text-muted-foreground -mt-1">Insurance</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <>
              <Link
                to={getDashboardPath()}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === getDashboardPath() ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                Dashboard
              </Link>
              {user?.role === 'customer' && (
                <Link
                  to="/customer/new-complaint"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === '/customer/new-complaint' ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  New Complaint
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                  {getRoleBadge()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gradient-accent text-accent-foreground border-0">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="container py-4 flex flex-col gap-2">
            {isAuthenticated && (
              <>
                <Link
                  to={getDashboardPath()}
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user?.role === 'customer' && (
                  <Link
                    to="/customer/new-complaint"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Complaint
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
