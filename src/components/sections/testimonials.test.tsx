import { render, screen } from '@testing-library/react';
import { Testimonials } from './testimonials';

// Mock data from external modules
jest.mock('@/lib/data', () => ({
  testimonials: [
    { id: '1', name: 'The Miller Family', story: 'We adopted our dog, Daisy...', image: 'testimonial-1' },
  ],
}));

jest.mock('@/lib/placeholder-images', () => ({
  PlaceHolderImages: [
    { id: 'testimonial-1', imageUrl: '/placeholder.jpg', imageHint: 'family', description: 'A family' }
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

describe('Testimonials', () => {
  it('renders the section title', () => {
    render(<Testimonials />);
    expect(screen.getByRole('heading', { name: /Happy Tails/i })).toBeInTheDocument();
  });

  it('renders a testimonial card', () => {
    render(<Testimonials />);
    expect(screen.getByText('- The Miller Family')).toBeInTheDocument();
    // Use a function to be more flexible with the text match
    expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'blockquote' && content.includes('We adopted our dog, Daisy...');
    })).toBeInTheDocument();
  });
});
