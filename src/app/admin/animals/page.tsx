'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { animals } from '@/lib/data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminAnimalsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Animals</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Animal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Animal Listings</CardTitle>
          <CardDescription>A list of all animals in the shelter.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animals.map((animal) => {
                const image = PlaceHolderImages.find((p) => p.id === animal.image);
                return (
                  <TableRow key={animal.id}>
                    <TableCell className="hidden sm:table-cell">
                      {image && (
                        <Image
                          alt={animal.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={image.imageUrl}
                          width="64"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{animal.name}</TableCell>
                    <TableCell>
                      <Badge variant={animal.adoptionStatus === 'Available' ? 'secondary' : 'default'}>{animal.adoptionStatus}</Badge>
                    </TableCell>
                    <TableCell>{animal.breed}</TableCell>
                    <TableCell className="hidden md:table-cell">{animal.age}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
