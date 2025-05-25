
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTripDialog: React.FC<CreateTripDialogProps> = ({ open, onOpenChange }) => {
  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🎯');

  const emojiOptions = ['🎯', '🍷', '🎉', '🏖️', '🍕', '✈️', '🎭', '🎸', '🍰', '🚗'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement trip creation
    console.log('Creating trip:', { tripName, description, emoji });
    onOpenChange(false);
    setTripName('');
    setDescription('');
    setEmoji('🎯');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/25 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label className="text-white/90">Choose an icon</Label>
            <div className="grid grid-cols-5 gap-2">
              {emojiOptions.map((emojiOption) => (
                <button
                  key={emojiOption}
                  type="button"
                  onClick={() => setEmoji(emojiOption)}
                  className={`p-3 text-2xl rounded-lg border transition-all ${
                    emoji === emojiOption
                      ? 'border-white/50 bg-white/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {emojiOption}
                </button>
              ))}
            </div>
          </div>

          {/* Trip Name */}
          <div className="space-y-2">
            <Label htmlFor="tripName" className="text-white/90">Trip Name</Label>
            <Input
              id="tripName"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g., Napa Valley Weekend"
              className="glass border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/90">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your trip..."
              className="glass border-white/20 text-white placeholder:text-white/50 focus:border-white/40 resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 glass border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold"
              disabled={!tripName.trim()}
            >
              Create Trip
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripDialog;
