import React, { useState } from 'react';
import { NameGeneratorButton } from '../../styles/Public';

interface NicknameGeneratorProps {
  onNicknameGenerated: (nickname: string) => void;
}

const NicknameGenerator: React.FC<NicknameGeneratorProps> = ({ onNicknameGenerated }) => {
  const [nickname, setNickname] = useState('');

  const generateNickname = () => {
    const prefixes = [
        "Cool", "Super", "Mighty", "Amazing", "Awesome", "Blazing", "Brilliant", "Bold", "Clever", "Daring",
        "Dynamic", "Dazzling", "Epic", "Electric", "Fancy", "Fierce", "Fiery", "Glorious", "Grand", "Great",
        "Gleaming", "Heroic", "Hyper", "Incredible", "Iron", "Invincible", "Joyful", "Jazzy", "Kicking", "King",
        "Lucky", "Luminous", "Majestic", "Miraculous", "Mystic", "Noble", "Neon", "Omega", "Outstanding", "Phenomenal",
        "Powerful", "Prime", "Quantum", "Quick", "Radiant", "Radical", "Savage", "Stellar", "Supreme", "Swift",
        "Thunder", "Ultimate", "Ultra", "Unstoppable", "Vivid", "Vibrant", "Warrior", "Wizard", "Xtreme", "Zenith",
        "Alpha", "Astro", "Binary", "Cosmic", "Dream", "Drift", "Echo", "Flame", "Flash", "Ghost",
        "Halo", "Impact", "Jolt", "Legend", "Meteor", "Nebula", "Orbit", "Pulse", "Quant", "Rift",
        "Storm", "Tempest", "Turbo", "Vortex", "Warp", "Whirl", "Zen", "Zephyr", "Blizzard", "Burst",
        "Circuit", "Dynamo", "Flux", "Gale", "Haze", "Jet", "Kaleido", "Laser", "Nova", "Opal",
        "Pixel", "Quasar", "Rune", "Spark", "Tide", "Vector", "Wave", "Yield", "Zoom", "Aeon"
    ];
    const suffixes = [
        "Wizard", "Ranger", "Ninja", "Knight", "Samurai", "Pirate", "Robot", "Alien", "Viking", "Gladiator",
        "Assassin", "Guru", "Oracle", "Mage", "Sorcerer", "Monk", "Paladin", "Hunter", "Sniper", "Warrior",
        "Barbarian", "Bard", "Cleric", "Druid", "Necromancer", "Rogue", "Shaman", "Warlock", "Wizardess", "Zombie",
        "Sphinx", "Phoenix", "Dragon", "Griffin", "Titan", "Giant", "Elf", "Dwarf", "Fairy", "Troll",
        "Minotaur", "Cyclops", "Hydra", "Centaur", "Werewolf", "Vampire", "Ghost", "Specter", "Mummy", "Goblin",
        "Ogre", "Demon", "Angel", "Archon", "Chimera", "Sprite", "Genie", "Mermaid", "Witch", "Seer",
        "Prophet", "Sage", "Pilgrim", "Explorer", "Mercenary", "Commander", "Chief", "Captain", "Pilot", "Astronaut",
        "Agent", "Detective", "Guardian", "Nomad", "Wanderer", "Raider", "Rebel", "Spy", "Diplomat", "President",
        "Senator", "Scientist", "Inventor", "Scholar", "Librarian", "Archer", "Marksman", "Healer", "Priest", "Sailor",
        "Adventurer", "Artisan", "Blacksmith", "Farmer", "Merchant", "Jester", "Poet", "Mystic", "Enchanter", "Sculptor",
        "Painter", "Musician", "Playwright", "Historian", "Philosopher", "Mathematician", "Engineer", "Teacher", "Guide", "Gardener"
    ];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const newNickname = `${randomPrefix}${randomSuffix}`;
    setNickname(newNickname);
    onNicknameGenerated(newNickname);
  };

  return (
    <div>
      <NameGeneratorButton type="button" onClick={generateNickname}>Generate Nickname</NameGeneratorButton>
      {nickname && <p>{nickname}</p>}
    </div>
  );
};

export default NicknameGenerator;