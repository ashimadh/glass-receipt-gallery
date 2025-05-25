import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const predefinedTags = [
    { name: 'Alcohol', emoji: '🍷', color: 'bg-red-100 text-red-800' },
    { name: 'Vegan', emoji: '🌱', color: 'bg-green-100 text-green-800' },
    { name: 'Dessert', emoji: '🍰', color: 'bg-pink-100 text-pink-800' },
    { name: 'Main Course', emoji: '🍽️', color: 'bg-blue-100 text-blue-800' },
    { name: 'Appetizer', emoji: '🥗', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Drinks', emoji: '🥤', color: 'bg-purple-100 text-purple-800' },
  ];

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
    setInputValue('');
    setIsAdding(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const availablePredefinedTags = predefinedTags.filter(
    predefinedTag => !tags.includes(predefinedTag.name)
  );

  return (
    <div className="space-y-2">
      {/* Existing tags */}
      <AnimatePresence>
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-1"
          >
            {tags.map((tag) => {
              const predefinedTag = predefinedTags.find(pt => pt.name === tag);
              return (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    predefinedTag ? predefinedTag.color : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {predefinedTag && <span className="text-xs">{predefinedTag.emoji}</span>}
                  {tag}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add tag interface */}
      <div className="flex flex-wrap gap-2">
        {/* Predefined tag buttons */}
        {availablePredefinedTags.slice(0, 3).map((predefinedTag) => (
          <motion.button
            key={predefinedTag.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddTag(predefinedTag.name)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border border-dashed ${predefinedTag.color} border-opacity-50 hover:border-opacity-100 transition-all duration-200`}
          >
            <span className="text-xs">{predefinedTag.emoji}</span>
            {predefinedTag.name}
          </motion.button>
        ))}

        {/* Custom tag input */}
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTag(inputValue);
                if (e.key === 'Escape') setIsAdding(false);
              }}
              placeholder="Custom tag..."
              className="px-2 py-1 text-xs border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAddTag(inputValue)}
              className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1 px-2 py-1 border border-dashed border-gray-300 rounded-full text-xs text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
          >
            <Plus className="w-3 h-3" />
            Add tag
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default TagInput;
