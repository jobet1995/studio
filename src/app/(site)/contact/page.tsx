import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="We'd love to hear from you! Whether you have a question about adoption, volunteering, or donations, our team is here to help."
      />
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help?" rows={5} />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Submit</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Our Shelter</h3>
                  <p>123 Furry Lane, Petville, PV 12345</p>
                  <p className="text-sm">Open daily from 10am - 5pm</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a href="tel:123-456-7890" className="hover:text-primary transition-colors">(123) 456-7890</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:info@animalkind.org" className="hover:text-primary transition-colors">info@animalkind.org</a>
                </div>
              </li>
            </ul>
             <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon"><Link href="#"><Facebook/></Link></Button>
                <Button asChild variant="outline" size="icon"><Link href="#"><Instagram/></Link></Button>
                <Button asChild variant="outline" size="icon"><Link href="#"><Twitter/></Link></Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-4 font-headline">Find Us Here</h2>
          <div className="aspect-[16/9] md:aspect-[16/6] relative w-full overflow-hidden rounded-lg">
            {mapImage && <Image src={mapImage.imageUrl} alt="Map to shelter" fill className="object-cover" data-ai-hint={mapImage.imageHint}/>}
          </div>
        </div>
      </div>
    </>
  );
}
