import { useState, useEffect } from 'react';
import { useGetEvents, useCreateEvent } from '../integrations/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');
  const getEvents = useGetEvents();
  const createEvent = useCreateEvent();
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events.",
        variant: "destructive",
      });
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEventName.trim()) return;

    try {
      await createEvent({ name: newEventName, date: new Date().toISOString() });
      setNewEventName('');
      fetchEvents();
      toast({
        title: "Success",
        description: "Event created successfully.",
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "Failed to create event.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEvent} className="flex space-x-2">
            <Input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              placeholder="Enter event name"
              className="flex-grow"
            />
            <Button type="submit">Create Event</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="bg-secondary p-2 rounded">
                  {event.name} - {new Date(event.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;