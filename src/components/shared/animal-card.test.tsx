import { render, screen } from '@testing-library/react';
import { AnimalCard } from './animal-card';
import type { Animal } from '@/lib/types';

const mockAnimal: Animal = {
  id: '1',
  name: 'Buddy',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: '2 years',
  size: 'Large',
  shortDescription: 'A friendly and energetic Golden Retriever.',
  description: 'Full description here.',
  healthInfo: 'Vaccinated and neutered.',
  personality: ['Friendly', 'Energetic'],
  adoptionStatus: 'Available',
  image: 'animal-1',
};

describe('AnimalCard', () => {
  it('renders animal details correctly', () => {
    render(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Golden Retriever')).toBeInTheDocument();
    expect(screen.getByText('2 years')).toBeInTheDocument();
    expect(screen.getByText('A friendly and energetic Golden Retriever.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/animals/1');
  });

  it('shows an "Adopted" badge when status is not available', () => {
    const adoptedAnimal = { ...mockAnimal, adoptionStatus: 'Adopted' as const };
    render(<AnimalCard animal={adoptedAnimal} />);
    expect(screen.getByText('Adopted')).toBeInTheDocument();
  });
});
