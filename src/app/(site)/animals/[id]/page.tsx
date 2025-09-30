import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { animals } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnimalCard } from '@/components/shared/animal-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function AnimalDetailPage({ params }: { params: { id: string } }) {
  const animal = animals.find((a) => a.id === params.id);

  if (!animal) {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(p => p.id === animal.image);
  const galleryImages = animal.gallery?.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean) || [mainImage].filter(Boolean);

  const relatedAnimals = animals
    .filter((a) => a.id !== animal.id && a.species === animal.species && a.adoptionStatus === 'Available')
    .slice(0, 3);

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                      {img && (
                        <Image
                          src={img.imageUrl}
                          alt={`${animal.name} - image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint={img.imageHint}
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {galleryImages.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4"/>
                    <CarouselNext className="right-4"/>
                  </>
              )}
            </Carousel>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{animal.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{animal.species}</Badge>
              <Badge variant="secondary">{animal.breed}</Badge>
              <Badge variant="secondary">{animal.age}</Badge>
              <Badge variant="secondary">{animal.size}</Badge>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">{animal.description}</p>
            
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Personality</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {animal.personality.map(trait => <Badge key={trait}>{trait}</Badge>)}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Health</h3>
                <p className="text-muted-foreground">{animal.healthInfo}</p>
              </div>
            </div>

            <Button asChild size="lg" className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={animal.adoptionStatus !== 'Available'}>
              <Link href="/adopt">
                {animal.adoptionStatus === 'Available' ? 'Apply to Adopt' : animal.adoptionStatus}
              </Link>
            </Button>
          </div>
        </div>

        {relatedAnimals.length > 0 && (
          <div className="mt-16 md:mt-24">
            <Separator />
            <h2 className="text-2xl md:text-3xl font-bold text-center my-8 font-headline">Other {animal.species}s You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAnimals.map(related => <AnimalCard key={related.id} animal={related}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
