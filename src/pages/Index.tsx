
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeSection from '../components/ThemeSection';
import PersonBubble from '../components/PersonBubble';
import { mockData } from '../data/mockData';

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [globalPeople] = useState([
    { id: '1', name: 'Alex', avatar: '👨‍💻', color: 'bg-blue-500' },
    { id: '2', name: 'Sarah', avatar: '👩‍🎨', color: 'bg-pink-500' },
    { id: '3', name: 'Mike', avatar: '👨‍🍳', color: 'bg-green-500' },
    { id: '4', name: 'Emma', avatar: '👩‍💼', color: 'bg-purple-500' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            SplitGlass
          </h1>
          <p className="text-xl text-purple-200 opacity-80">
            Split bills beautifully, one memory at a time
          </p>
        </div>
      </motion.header>

      {/* People floating bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-20 mx-6 mb-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <span className="text-white/80 text-sm font-medium whitespace-nowrap">People:</span>
              {globalPeople.map((person) => (
                <PersonBubble key={person.id} person={person} size="sm" />
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-all duration-200 border border-white/20 whitespace-nowrap"
              >
                <span className="text-lg">+</span>
                Add Person
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-12"
          >
            {mockData.themes.map((theme, index) => (
              <ThemeSection
                key={theme.id}
                theme={theme}
                people={globalPeople}
                isExpanded={selectedTheme === theme.id}
                onToggle={() => setSelectedTheme(selectedTheme === theme.id ? null : theme.id)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
