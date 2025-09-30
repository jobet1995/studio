import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, MapPin } from 'lucide-react';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const image = PlaceHolderImages.find(p => p.id === event.image);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-bold mb-2">{event.title}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4"/>
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4"/>
                <span>{event.location}</span>
            </div>
        </div>
        <p className="mt-3 text-sm line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="#">Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
