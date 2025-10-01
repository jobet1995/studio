import { render, screen } from '@testing-library/react';
import { Testimonials } from './testimonials';

// Mock data
jest.mock('@/lib/data', () => ({
  testimonials: [
    { id: '1', name: 'The Miller Family', story: "We adopted our dog, Daisy...", image: 'testimonial-1' },
  ],
}));

describe('Testimonials', () => {
  it('renders the section title', () => {
    render(<Testimonials />);
    expect(screen.getByRole('heading', { name: /Happy Tails/i })).toBeInTheDocument();
  });

  it('renders a testimonial card', () => {
    render(<Testimonials />);
    expect(screen.getByText('- The Miller Family')).toBeInTheDocument();
    expect(screen.getByText(/"We adopted our dog, Daisy..."/i)).toBeInTheDocument();
  });
});
