import { render, screen } from '@testing-library/react';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the main headline and call-to-action buttons', () => {
    render(<Hero />);
    
    expect(screen.getByRole('heading', { name: /Help Us Save Animals/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Adopt Now' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Donate' })).toBeInTheDocument();
  });
});
