import { render, screen } from '@testing-library/react';
import { FeaturedAnimals } from './featured-animals';

// Mock data
jest.mock('@/lib/data', () => ({
  animals: [
    { id: '1', name: 'Buddy', adoptionStatus: 'Available', shortDescription: 'A good boy', breed: 'Retriever', age: '2 years', image: 'animal-1' },
    { id: '2', name: 'Lucy', adoptionStatus: 'Available', shortDescription: 'A nice cat', breed: 'Siamese', age: '1 year', image: 'animal-2' },
  ],
}));

// Mock the carousel component
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Previous</button>,
}));


describe('FeaturedAnimals', () => {
  it('renders the section title and a link to all animals', () => {
    render(<FeaturedAnimals />);
    
    expect(screen.getByRole('heading', { name: /Meet Your New Best Friend/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View All Animals' })).toBeInTheDocument();
  });

  it('renders featured animal cards', () => {
    render(<FeaturedAnimals />);

    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Lucy')).toBeInTheDocument();
  });
});
