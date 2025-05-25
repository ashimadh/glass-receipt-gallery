
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TagInput from './TagInput';
import PersonBubble from './PersonBubble';

interface LineItemData {
  id: string;
  name: string;
  price: number;
  tags: string[];
  assignedTo: string[];
}

interface Person {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface LineItemProps {
  item: LineItemData;
  people: Person[];
  index: number;
}

const LineItem: React.FC<LineItemProps> = ({ item, people, index }) => {
  const [assignedPeople, setAssignedPeople] = useState<string[]>(item.assignedTo);
  const [tags, setTags] = useState<string[]>(item.tags);

  const handlePersonToggle = (personId: string) => {
    setAssignedPeople(prev => 
      prev.includes(personId)
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const assignedPersons = people.filter(person => 
    assignedPeople.includes(person.id)
  );

  const splitAmount = assignedPeople.length > 0 ? item.price / assignedPeople.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="p-4 bg-gradient-to-r from-white/80 to-white/60 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">${item.price.toFixed(2)}</span>
            {assignedPeople.length > 0 && (
              <>
                <span>→</span>
                <span>${splitAmount.toFixed(2)} each</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-3">
        <TagInput tags={tags} onTagsChange={setTags} />
      </div>

      {/* People assignment */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Split between:</span>
          {assignedPersons.length > 0 ? (
            <div className="flex -space-x-1">
              {assignedPersons.map(person => (
                <PersonBubble key={person.id} person={person} size="xs" />
              ))}
            </div>
          ) : (
            <span className="text-gray-400 italic">No one assigned</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {people.map(person => (
            <motion.button
              key={person.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePersonToggle(person.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-200 border ${
                assignedPeople.includes(person.id)
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              <span className="text-xs">{person.avatar}</span>
              <span>{person.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LineItem;
