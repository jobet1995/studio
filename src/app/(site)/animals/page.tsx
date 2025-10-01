'use client';

import { useState } from 'react';
import { animals as allAnimals } from '@/lib/data';
import type { Animal } from '@/lib/types';
import { AnimalCard } from '@/components/shared/animal-card';
import { PageHeader } from '@/components/shared/page-header';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const speciesOptions = ['All', 'Dog', 'Cat', 'Other'];
const ageOptions = ['All', 'Puppy/Kitten (0-1yr)', 'Young (1-3yrs)', 'Adult (3-7yrs)', 'Senior (7+ yrs)'];
const sizeOptions = ['All', 'Small', 'Medium', 'Large'];

export default function AnimalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');

  const getAgeCategory = (ageString: string): string => {
    const ageNum = parseInt(ageString);
    if (ageNum <= 1) return 'Puppy/Kitten (0-1yr)';
    if (ageNum <= 3) return 'Young (1-3yrs)';
    if (ageNum <= 7) return 'Adult (3-7yrs)';
    return 'Senior (7+ yrs)';
  };

  const filteredAnimals = allAnimals.filter((animal: Animal) => {
    return (
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (speciesFilter === 'All' || animal.species === speciesFilter) &&
      (sizeFilter === 'All' || animal.size === sizeFilter) &&
      (ageFilter === 'All' || getAgeCategory(animal.age) === ageFilter)
    );
  });

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
        title="Find a Friend"
        subtitle="Browse our adorable animals waiting for a loving home. Your new best friend might be just a click away."
      />
      <div className="container py-12">
        <div className="mb-8 p-4 rounded-lg bg-secondary/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by species" />
              </SelectTrigger>
              <SelectContent>
                {speciesOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by age" />
              </SelectTrigger>
              <SelectContent>
                {ageOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by size" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAnimals.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredAnimals.map((animal) => (
              <motion.div key={animal.id} variants={itemVariants}>
                <AnimalCard animal={animal} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Animals Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or check back later!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
