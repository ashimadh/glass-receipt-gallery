
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="text-2xl">💸</div>
              <div>
                <h1 className="text-xl font-bold text-white">FlowSplit</h1>
                <p className="text-xs text-white/70">Split bills beautifully</p>
              </div>
            </motion.div>

            {/* Navigation & Auth */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {/* Navigation for authenticated users */}
                  <div className="hidden md:flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="text-white hover:bg-white/10"
                    >
                      Dashboard
                    </Button>
                  </div>

                  {/* User menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-white/20 text-white">
                            {getUserInitials(user.email || '')}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 glass-strong border-white/25" align="end">
                      <DropdownMenuItem className="text-white hover:bg-white/10">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-white/10">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-white/10">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Upgrade to Pro</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={handleSignOut}
                        className="text-white hover:bg-white/10"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Guest navigation */}
                  <div className="hidden md:flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="text-white hover:bg-white/10"
                    >
                      Try Demo
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/auth')}
                    className="bg-white text-primary hover:bg-white/90 font-semibold"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
