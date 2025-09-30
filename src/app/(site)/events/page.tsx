'use client';

import { useState } from 'react';
import { events as allEvents } from '@/lib/data';
import type { Event } from '@/lib/types';
import { EventCard } from '@/components/shared/event-card';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const eventTypes = ['All', 'Adoption Drive', 'Fundraiser', 'Volunteer Day'];

export default function EventsPage() {
  const [filter, setFilter] = useState('All');

  const filteredEvents = allEvents.filter(
    (event: Event) => filter === 'All' || event.type === filter
  );

  return (
    <>
      <PageHeader
        title="Upcoming Events"
        subtitle="Join us for fun, community, and to support our furry friends. There's always something happening at AnimalKind!"
      />
      <div className="container py-12">
        <div className="flex justify-center mb-8">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              {eventTypes.map((type) => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Events Found</h3>
            <p className="text-muted-foreground mt-2">
              Please check back later for upcoming events!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
