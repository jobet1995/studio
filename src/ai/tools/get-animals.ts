'use server';

import { ai } from '@/ai/genkit';
import { animals } from '@/lib/data';
import { z } from 'zod';

export const getAnimals = ai.defineTool(
  {
    name: 'getAnimals',
    description: 'Get a list of animals available for adoption. Can be filtered by species.',
    inputSchema: z.object({
      species: z.enum(['Dog', 'Cat', 'Other']).optional().describe('The species of animal to filter by.'),
    }),
    outputSchema: z.array(
      z.object({
        name: z.string(),
        breed: z.string(),
        age: z.string(),
        shortDescription: z.string(),
      })
    ),
  },
  async (input) => {
    let availableAnimals = animals.filter((a) => a.adoptionStatus === 'Available');

    if (input.species) {
      availableAnimals = availableAnimals.filter((a) => a.species === input.species);
    }

    return availableAnimals.map(({ name, breed, age, shortDescription }) => ({ name, breed, age, shortDescription }));
  }
);
