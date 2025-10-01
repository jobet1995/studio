'use client';

import { useState } from 'react';
import { blogPosts as allPosts } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import { BlogPostCard } from '@/components/shared/blog-post-card';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const categories = ['All', 'Training', 'Adoption', 'Community'];

export default function BlogPage() {
  const [filter, setFilter] = useState('All');

  const filteredPosts = allPosts.filter(
    (post: BlogPost) => filter === 'All' || post.category === filter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <PageHeader
        title="Our Blog"
        subtitle="Stay updated with the latest news, success stories, and helpful tips from the AnimalKind team."
      />
      <div className="container py-12">
        <div className="flex justify-center mb-8">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Posts Found</h3>
            <p className="text-muted-foreground mt-2">
              Check back soon for new articles!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
