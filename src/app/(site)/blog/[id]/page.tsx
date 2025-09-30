import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts, animals } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BlogPostCard } from '@/components/shared/blog-post-card';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === post.image);
  
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <article>
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        {image && (
          <Image
            src={image.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container -mt-20 md:-mt-32 relative z-10">
        <div className="max-w-3xl mx-auto bg-background rounded-lg shadow-lg p-6 md:p-8">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold font-headline">{post.title}</h1>
          <p className="mt-2 text-muted-foreground">
            By {post.author} on {post.date}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-a:text-primary">
            <p>{post.content}</p>
            {/* Example of more content */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>
            <blockquote>“The love for all living creatures is the most noble attribute of man.” - Charles Darwin</blockquote>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
          <div className="bg-secondary/30 py-16 md:py-24">
            <div className="container">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-headline">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(related => <BlogPostCard key={related.id} post={related}/>)}
              </div>
            </div>
          </div>
        )}
    </article>
  );
}
