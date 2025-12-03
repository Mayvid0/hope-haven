import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
});

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "awareness" | "workshop" | "fundraising";
  capacity: number;
  registered: number;
  image: string | null;
}

const Events = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rsvpData, setRsvpData] = useState({ name: "", email: "", phone: "" });
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openRSVPDialog = (event: Event) => {
    setSelectedEvent(event);
    setRsvpData({ name: "", email: "", phone: "" });
    setDialogOpen(true);
  };

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setSubmitting(true);

    try {
      // Validate input
      rsvpSchema.parse(rsvpData);

      // Insert RSVP into database
      const { error: rsvpError } = await supabase
        .from('rsvps')
        .insert({
          event_id: selectedEvent.id,
          name: rsvpData.name,
          email: rsvpData.email,
          phone: rsvpData.phone,
        });

      if (rsvpError) {
        if (rsvpError.code === '23505') {
          throw new Error('You have already registered for this event');
        }
        throw rsvpError;
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-rsvp-confirmation', {
        body: {
          name: rsvpData.name,
          email: rsvpData.email,
          eventTitle: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventTime: selectedEvent.time,
          eventLocation: selectedEvent.location,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }

      toast({
        title: "RSVP Confirmed!",
        description: `You've successfully registered for ${selectedEvent.title}. Check your email for details.`,
      });

      setDialogOpen(false);
      setSelectedEvent(null);
      setRsvpData({ name: "", email: "", phone: "" });
      fetchEvents(); // Refresh events to update registered count
    } catch (error: any) {
      console.error('RSVP error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register for event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filterEvents = (type?: string) => {
    if (!type || type === "all") return events;
    return events.filter(event => event.type === type);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "awareness": return "bg-blue-500";
      case "workshop": return "bg-green-500";
      case "fundraising": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted relative">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Calendar className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className={`absolute top-4 right-4 ${getEventTypeColor(event.type)} text-white`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.registered} / {event.capacity} registered</span>
          </div>
        </div>
        <div className="pt-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={() => openRSVPDialog(event)}
            disabled={event.registered >= event.capacity}
          >
            {event.registered >= event.capacity ? "Event Full" : "Register Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <Tag className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join us for awareness events, educational workshops, and fundraising activities
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="awareness">Awareness</TabsTrigger>
              <TabsTrigger value="workshop">Workshops</TabsTrigger>
              <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {loading ? (
                <div className="text-center py-12">Loading events...</div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No events available</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvents().map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="awareness" className="space-y-6">
              {loading ? (
                <div className="text-center py-12">Loading events...</div>
              ) : filterEvents("awareness").length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No awareness events available</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvents("awareness").map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="workshop" className="space-y-6">
              {loading ? (
                <div className="text-center py-12">Loading events...</div>
              ) : filterEvents("workshop").length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No workshop events available</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvents("workshop").map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="fundraising" className="space-y-6">
              {loading ? (
                <div className="text-center py-12">Loading events...</div>
              ) : filterEvents("fundraising").length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No fundraising events available</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvents("fundraising").map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* RSVP Dialog - Controlled and outside EventCard */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to reserve your spot
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRSVP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rsvp-name">Full Name *</Label>
              <Input
                id="rsvp-name"
                value={rsvpData.name}
                onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvp-email">Email *</Label>
              <Input
                id="rsvp-email"
                type="email"
                value={rsvpData.email}
                onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvp-phone">Phone Number *</Label>
              <Input
                id="rsvp-phone"
                type="tel"
                value={rsvpData.phone}
                onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                required
              />
            </div>
            {selectedEvent && (
              <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
                <p className="font-medium">Event Details:</p>
                <p className="text-muted-foreground">{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</p>
                <p className="text-muted-foreground">{selectedEvent.location}</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Registering..." : "Confirm Registration"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
