
import { User } from '../types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', username: 'Eldrin the Wise', wizardPoints: 12550, level: 13, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Eldrin', completedChallengeIds: ['m1', 'm2', 'm3', 'm4', 'p1', 'p2', 'p3', 'c1', 'cs3'], stream: 'Non-Medical' },
    { id: 'user-2', username: 'Lyra Spellweaver', wizardPoints: 11820, level: 12, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Lyra', completedChallengeIds: ['cs1', 'cs2', 'cs3', 'cs4', 'm1', 'm3'], stream: 'Non-Medical' },
    { id: 'user-3', username: 'Kaelen Shadowhand', wizardPoints: 10500, level: 11, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Kaelen', completedChallengeIds: ['p4', 'c4', 'cs2', 'm7'], stream: 'Medical' },
    { id: 'user-4', username: 'Seraphina Firegem', wizardPoints: 9870, level: 10, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Seraphina', completedChallengeIds: ['c1', 'c2', 'c3', 'm2', 'm5'], stream: 'Non-Medical' },
    { id: 'user-5', username: 'Garrick Alchemist', wizardPoints: 8400, level: 9, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Garrick', completedChallengeIds: ['c1', 'c2', 'c3', 'c4', 'p1'], stream: 'Medical' },
    { id: 'user-6', username: 'Ronan Stormcaller', wizardPoints: 7230, level: 8, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Ronan', completedChallengeIds: ['p1', 'p2', 'p5'], stream: 'Non-Medical' },
    { id: 'user-7', username: 'Faye Whisperwind', wizardPoints: 6100, level: 7, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Faye', completedChallengeIds: ['m1', 'm3', 'm6'], stream: 'Arts' },
    { id: 'user-8', username: 'Orion Starseeker', wizardPoints: 4550, level: 5, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Orion', completedChallengeIds: ['p2', 'cs3'], stream: 'Non-Medical' },
    { id: 'user-9', username: 'Zephyr Rune-eye', wizardPoints: 3200, level: 4, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Zephyr', completedChallengeIds: ['cs1', 'cs4'], stream: 'Commerce' },
    { id: 'user-10', username: 'Astrid Frostbeard', wizardPoints: 2150, level: 3, avatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Astrid', completedChallengeIds: ['p1', 'p3'], stream: 'Medical' },
];