
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReceiptCard from './ReceiptCard';
import { ChevronDown } from 'lucide-react';

interface Theme {
  id: string;
  title: string;
  icon: string;
  color: string;
  receipts: any[];
  totalAmount: number;
  totalPeople: number;
}

interface Person {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface ThemeSectionProps {
  theme: Theme;
  people: Person[];
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({
  theme,
  people,
  isExpanded,
  onToggle,
  index
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      {/* Theme header */}
      <motion.div
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 cursor-pointer mb-6 hover:bg-white/15 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{theme.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{theme.title}</h2>
              <div className="flex items-center gap-4 text-white/70">
                <span>${theme.totalAmount.toFixed(2)} total</span>
                <span>•</span>
                <span>{theme.receipts.length} receipts</span>
                <span>•</span>
                <span>{theme.totalPeople} people</span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-white/70" />
          </motion.div>
        </div>
      </motion.div>

      {/* Receipts grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {theme.receipts.map((receipt, receiptIndex) => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  people={people}
                  index={receiptIndex}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ThemeSection;
