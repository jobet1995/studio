import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-headline">
          Help Us Save Animals
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
          Your support gives them a second chance at a happy life.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/animals">Adopt Now</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/donate">Donate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
