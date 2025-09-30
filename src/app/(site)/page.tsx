import { Hero } from '@/components/sections/hero';
import { FeaturedAnimals } from '@/components/sections/featured-animals';
import { Testimonials } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedAnimals />
      <Testimonials />
    </>
  );
}
