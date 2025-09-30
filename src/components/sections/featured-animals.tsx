import Link from 'next/link';
import { animals } from '@/lib/data';
import { AnimalCard } from '../shared/animal-card';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function FeaturedAnimals() {
  const featured = animals.filter(a => a.adoptionStatus === 'Available').slice(0, 5);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Meet Your New Best Friend</h2>
            <p className="mt-2 text-lg text-muted-foreground">These wonderful animals are looking for their forever homes.</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/animals">View All Animals</Link>
          </Button>
        </div>

        <Carousel 
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featured.map((animal) => (
              <CarouselItem key={animal.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <AnimalCard animal={animal} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex"/>
          <CarouselNext className="hidden md:flex"/>
        </Carousel>
      </div>
    </section>
  );
}
