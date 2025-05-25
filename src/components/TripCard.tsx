
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Receipt, Clock, CheckCircle } from 'lucide-react';
import PersonBubble from './PersonBubble';

interface TripMember {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface Trip {
  id: string;
  title: string;
  icon: string;
  totalAmount: number;
  memberCount: number;
  receiptCount: number;
  lastActivity: string;
  isFinalized: boolean;
  members: TripMember[];
}

interface TripCardProps {
  trip: Trip;
  index: number;
  onClick: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="glass-card border-white/25 overflow-hidden h-full">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{trip.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{trip.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {trip.isFinalized ? (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Finalized
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Amount */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              ${trip.totalAmount.toFixed(2)}
            </div>
            <p className="text-white/70 text-sm">Total amount</p>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-white/70">
              <Users className="w-4 h-4" />
              <span>{trip.memberCount} people</span>
            </div>
            <div className="flex items-center gap-1 text-white/70">
              <Receipt className="w-4 h-4" />
              <span>{trip.receiptCount} receipts</span>
            </div>
          </div>

          {/* Members */}
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">Members:</span>
            <div className="flex -space-x-2">
              {trip.members.slice(0, 3).map((member) => (
                <PersonBubble
                  key={member.id}
                  person={member}
                  size="xs"
                />
              ))}
              {trip.memberCount > 3 && (
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs text-white border border-white/30">
                  +{trip.memberCount - 3}
                </div>
              )}
            </div>
          </div>

          {/* Last Activity */}
          <div className="text-white/60 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last activity {trip.lastActivity}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TripCard;
