import Image from 'next/image';
import Link from 'next/link';
import type { Animal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type AnimalCardProps = {
  animal: Animal;
};

export function AnimalCard({ animal }: AnimalCardProps) {
  const image = PlaceHolderImages.find(p => p.id === animal.image);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/animals/${animal.id}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={animal.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
            {animal.adoptionStatus !== 'Available' && (
              <Badge 
                variant={animal.adoptionStatus === 'Adopted' ? 'secondary' : 'default'}
                className="absolute top-2 right-2 bg-primary/80 text-primary-foreground backdrop-blur-sm"
              >
                {animal.adoptionStatus}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold mb-2">{animal.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{animal.breed}</p>
          <p className="text-sm text-muted-foreground">{animal.age}</p>
          <p className="mt-2 text-sm line-clamp-2">{animal.shortDescription}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/animals/${animal.id}`}>Adopt Me</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
