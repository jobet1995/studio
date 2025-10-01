import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminApplicationsPage() {
  const applications = [
    { id: 1, name: 'John Doe', animalName: 'Buddy', animalId: '1', date: '2024-07-28', status: 'Pending' },
    { id: 2, name: 'Jane Smith', animalName: 'Lucy', animalId: '2', date: '2024-07-27', status: 'Approved' },
    { id: 3, name: 'Sam Wilson', animalName: 'Rocky', animalId: '3', date: '2024-07-26', status: 'Pending' },
    { id: 4, name: 'Alice Brown', animalName: 'Misty', animalId: '4', date: '2024-07-25', status: 'Rejected' },
    { id: 5, name: 'Chris Green', animalName: 'Charlie', animalId: '5', date: '2024-07-24', status: 'Approved' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption Applications</CardTitle>
        <CardDescription>Review and manage all adoption applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Animal</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.animalName}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>
                  <Badge variant={app.status === 'Approved' ? 'default' : app.status === 'Pending' ? 'secondary' : 'destructive'}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline">
                    <Link href="#">
                      View Application <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
