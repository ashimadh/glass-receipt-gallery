import React from 'react';
import { motion } from 'framer-motion';

interface Person {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface PersonBubbleProps {
  person: Person;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showName?: boolean;
}

const PersonBubble: React.FC<PersonBubbleProps> = ({ 
  person, 
  size = 'md', 
  onClick,
  showName = false 
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <div className="flex items-center gap-2">
      <Component
        whileHover={{ scale: 1.1 }}
        whileTap={onClick ? { scale: 0.95 } : undefined}
        onClick={onClick}
        className={`${sizeClasses[size]} ${person.color} rounded-full flex items-center justify-center text-white font-medium shadow-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200 ${
          onClick ? 'cursor-pointer' : ''
        }`}
        title={person.name}
      >
        {person.avatar}
      </Component>
      {showName && (
        <span className="text-white text-sm font-medium">
          {person.name}
        </span>
      )}
    </div>
  );
};

export default PersonBubble;
