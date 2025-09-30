import Image from 'next/image';
import { testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center tracking-tight md:text-4xl font-headline">Happy Tails</h2>
        <p className="mt-2 text-lg text-center text-muted-foreground">
          Hear from some of our happy adoptive families.
        </p>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-4xl mx-auto mt-8"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const image = PlaceHolderImages.find(p => p.id === testimonial.image);
              return (
                <CarouselItem key={testimonial.id}>
                  <div className="p-4">
                    <Card className="bg-secondary/30 border-0">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={testimonial.name}
                            width={100}
                            height={100}
                            className="rounded-full mb-4"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <blockquote className="italic text-muted-foreground">
                          "{testimonial.story}"
                        </blockquote>
                        <p className="mt-4 font-semibold text-lg">
                          - {testimonial.name}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
