import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Users, Settings } from 'lucide-react';
import { mockData } from '@/data/mockData';
import ReceiptCard from '@/components/ReceiptCard';

const TripView = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  // Mock trip data - will be replaced with real data
  const trip = mockData.themes.find(t => t.id === tripId) || mockData.themes[0];
  
  const globalPeople = [
    { id: '1', name: 'Alex', avatar: '👨‍💻', color: 'bg-blue-500' },
    { id: '2', name: 'Sarah', avatar: '👩‍🎨', color: 'bg-pink-500' },
    { id: '3', name: 'Mike', avatar: '👨‍🍳', color: 'bg-green-500' },
    { id: '4', name: 'Emma', avatar: '👩‍💼', color: 'bg-purple-500' },
  ];

  return (
    <div className="gradient-primary">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="text-4xl">{trip.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{trip.title}</h1>
                  <p className="text-white/80">
                    ${trip.totalAmount.toFixed(2)} • {trip.totalPeople} people • {trip.receipts.length} receipts
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Users className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Add Receipt
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Receipts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trip.receipts.map((receipt, index) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
                people={globalPeople}
                index={index}
              />
            ))}
          </div>

          {trip.receipts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧾</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No receipts yet</h3>
              <p className="text-white/70 mb-6">Add your first receipt to start splitting expenses</p>
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Receipt
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TripView;
