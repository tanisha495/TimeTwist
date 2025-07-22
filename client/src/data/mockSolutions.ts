
import { PeerSolution } from '../types';

export const MOCK_SOLUTIONS: PeerSolution[] = [
    {
        id: 'mock-sol-1',
        author: 'Eldrin the Wise',
        authorAvatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Eldrin',
        challengeId: 'p-nm-8',
        challengeAnswer: "The final velocity is 4 m/s.",
        explanation: "This is a classic inelastic collision, governed by the law of conservation of momentum. The formula is m₁v₁ + m₂v₂ = (m₁ + m₂)v_f. The first cart (m₁=2kg) has initial velocity v₁=6 m/s. The second cart (m₂=1kg) is stationary, so v₂=0. The total initial momentum is (2kg * 6m/s) + (1kg * 0m/s) = 12 kg·m/s. After they stick together, the total mass is m₁+m₂ = 3kg. Setting initial momentum equal to final momentum: 12 kg·m/s = (3kg) * v_f. Solving for the final velocity v_f gives 12/3 = 4 m/s.",
        rating: 4.8,
        comments: 15,
    },
    {
        id: 'mock-sol-2',
        author: 'Lyra Spellweaver',
        authorAvatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Lyra',
        challengeId: 'cs-ac-6',
        challengeAnswer: "The output is 55.",
        explanation: "This value is the 10th number in the Fibonacci sequence (starting with F(0)=0, F(1)=1). It's calculated using the recursive definition F(n) = F(n-1) + F(n-2). The sequence starts 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... A recursive function would call itself repeatedly until it reaches the base cases of F(0) and F(1). The sum of these calls eventually computes the final value of 55 for F(10).",
        rating: 4.5,
        comments: 12,
    },
    {
        id: 'mock-sol-3',
        author: 'Garrick Alchemist',
        authorAvatar: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=Garrick',
        challengeId: 'c-ab-3',
        challengeAnswer: "The products are a salt and water.",
        explanation: "This is the definitive outcome of an acid-base neutralization reaction. For example, if you react a strong acid like Hydrochloric Acid (HCl) with a strong base like Sodium Hydroxide (NaOH), the H⁺ from the acid combines with the OH⁻ from the base to form H₂O (water). The remaining ions, Na⁺ and Cl⁻, combine to form the salt Sodium Chloride (NaCl). The general equation is Acid + Base → Salt + Water.",
        rating: 4.2,
        comments: 8,
    }
];