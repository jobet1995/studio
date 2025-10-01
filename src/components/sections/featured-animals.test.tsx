import { render, screen } from '@testing-library/react';
import { FeaturedAnimals } from './featured-animals';

// Mock data
jest.mock('@/lib/data', () => ({
  animals: [
    { id: '1', name: 'Buddy', adoptionStatus: 'Available', shortDescription: 'A good boy', breed: 'Retriever', age: '2 years', image: 'animal-1' },
    { id: '2', name: 'Lucy', adoptionStatus: 'Available', shortDescription: 'A nice cat', breed: 'Siamese', age: '1 year', image: 'animal-2' },
  ],
}));

jest.mock('@/lib/placeholder-images', () => ({
    PlaceHolderImages: [
        { id: 'animal-1', imageUrl: '/placeholder.jpg', imageHint: 'dog' },
        { id: 'animal-2', imageUrl: '/placeholder.jpg', imageHint: 'cat' }
    ]
}));

// Mock the carousel component as it has issues in JSDOM
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
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
