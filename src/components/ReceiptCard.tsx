
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LineItem from './LineItem';
import PersonBubble from './PersonBubble';
import { Eye, User } from 'lucide-react';

interface Receipt {
  id: string;
  title: string;
  total: number;
  payer: string;
  image: string;
  date: string;
  items: any[];
  people: string[];
}

interface Person {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface ReceiptCardProps {
  receipt: Receipt;
  people: Person[];
  index: number;
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt, people, index }) => {
  const [isDetailView, setIsDetailView] = useState(false);

  const involvedPeople = people.filter(person => 
    receipt.people.includes(person.id)
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group cursor-pointer"
        onClick={() => setIsDetailView(true)}
      >
        <div className="backdrop-blur-lg bg-white/10 rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 hover:border-white/30">
          {/* Receipt image header */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={receipt.image}
              alt={receipt.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-semibold text-white mb-1">{receipt.title}</h3>
              <p className="text-white/80 text-sm">{receipt.date}</p>
            </div>
          </div>

          {/* Receipt details */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-white">
                ${receipt.total.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <User className="w-4 h-4" />
                Paid by {receipt.payer}
              </div>
            </div>

            {/* People involved */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white/70 text-sm">Split between:</span>
              <div className="flex -space-x-2">
                {involvedPeople.slice(0, 3).map(person => (
                  <PersonBubble key={person.id} person={person} size="xs" />
                ))}
                {involvedPeople.length > 3 && (
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs text-white border border-white/30">
                    +{involvedPeople.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>{receipt.items.length} items</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Eye className="w-3 h-3" />
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDetailView(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{receipt.title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDetailView(false)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  ×
                </motion.button>
              </div>

              <div className="space-y-4">
                {receipt.items.map((item, itemIndex) => (
                  <LineItem
                    key={item.id}
                    item={item}
                    people={people}
                    index={itemIndex}
                  />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${receipt.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReceiptCard;
