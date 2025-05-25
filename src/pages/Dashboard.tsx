import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Receipt, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TripCard from '@/components/TripCard';
import CreateTripDialog from '@/components/CreateTripDialog';

// Mock data - will be replaced with real data later
const mockTrips = [
  {
    id: '1',
    title: 'Napa Valley Weekend',
    icon: '🍷',
    totalAmount: 847.32,
    memberCount: 4,
    receiptCount: 3,
    lastActivity: '2 days ago',
    isFinalized: false,
    members: [
      { id: '1', name: 'Alex', avatar: '👨‍💻', color: 'bg-blue-500' },
      { id: '2', name: 'Sarah', avatar: '👩‍🎨', color: 'bg-pink-500' },
    ]
  },
  {
    id: '2',
    title: "Sarah's Birthday",
    icon: '🎉',
    totalAmount: 392.45,
    memberCount: 6,
    receiptCount: 2,
    lastActivity: '1 week ago',
    isFinalized: true,
    members: [
      { id: '2', name: 'Sarah', avatar: '👩‍🎨', color: 'bg-pink-500' },
      { id: '3', name: 'Mike', avatar: '👨‍🍳', color: 'bg-green-500' },
    ]
  }
];

const Dashboard = () => {
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="gradient-primary">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-72 h-72 gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 p-6">
        {/* Welcome message for authenticated users */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto mb-6"
          >
            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-white">
                Welcome back, {user.email?.split('@')[0]}! 👋
              </h2>
              <p className="text-white/70 text-sm">Your data will be saved automatically</p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your Trips</h1>
              <p className="text-white/80 text-lg">
                {user ? 'Manage your bill-splitting adventures' : 'Try our demo - sign up to save your data'}
              </p>
            </div>
            <Button
              onClick={() => setShowCreateTrip(true)}
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Trip
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-white/25">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Total Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{mockTrips.length}</div>
                <p className="text-white/70 text-sm">Active and completed</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/25">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">12</div>
                <p className="text-white/70 text-sm">Connected friends</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/25">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">$1,239</div>
                <p className="text-white/70 text-sm">Total split amount</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Trips Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTrips.map((trip, index) => (
              <TripCard
                key={trip.id}
                trip={trip}
                index={index}
                onClick={() => navigate(`/trip/${trip.id}`)}
              />
            ))}
          </div>

          {mockTrips.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No trips yet</h3>
              <p className="text-white/70 mb-6">Create your first trip to start splitting bills with friends</p>
              <Button
                onClick={() => setShowCreateTrip(true)}
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Trip
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      <CreateTripDialog 
        open={showCreateTrip} 
        onOpenChange={setShowCreateTrip}
      />
    </div>
  );
};

export default Dashboard;
