import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
  image: string;
}

const Events = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rsvpData, setRsvpData] = useState({ name: "", email: "", phone: "" });
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Breast Cancer Awareness Walk",
      description: "Join us for our annual awareness walk to support breast cancer research and survivors. All ages welcome!",
      date: "2024-04-15",
      time: "9:00 AM",
      location: "City Park, Main Entrance",
      type: "awareness",
      capacity: 500,
      registered: 287,
      image: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Understanding Cancer Prevention Workshop",
      description: "Learn about lifestyle changes, screening guidelines, and prevention strategies from medical experts.",
      date: "2024-04-22",
      time: "2:00 PM",
      location: "Community Health Center",
      type: "workshop",
      capacity: 50,
      registered: 38,
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Hope Gala Fundraiser",
      description: "An elegant evening of dinner, entertainment, and silent auction to raise funds for cancer research.",
      date: "2024-05-10",
      time: "6:00 PM",
      location: "Grand Hotel Ballroom",
      type: "fundraising",
      capacity: 200,
      registered: 145,
      image: "/placeholder.svg"
    },
    {
      id: "4",
      title: "Nutrition & Wellness for Cancer Survivors",
      description: "Interactive workshop on nutrition, exercise, and wellness strategies for cancer survivors and caregivers.",
      date: "2024-05-18",
      time: "10:00 AM",
      location: "Wellness Center",
      type: "workshop",
      capacity: 40,
      registered: 22,
      image: "/placeholder.svg"
    },
    {
      id: "5",
      title: "Pediatric Cancer Awareness Day",
      description: "Family-friendly event featuring activities for children, resources for parents, and survivor stories.",
      date: "2024-06-01",
      time: "11:00 AM",
      location: "Children's Hospital Courtyard",
      type: "awareness",
      capacity: 300,
      registered: 156,
      image: "/placeholder.svg"
    },
    {
      id: "6",
      title: "Annual Charity Golf Tournament",
      description: "18-hole tournament followed by awards ceremony and dinner. All proceeds support cancer patient services.",
      date: "2024-06-15",
      time: "7:00 AM",
      location: "Riverside Golf Club",
      type: "fundraising",
      capacity: 144,
      registered: 98,
      image: "/placeholder.svg"
    }
  ]);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "RSVP Confirmed!",
      description: `You've successfully registered for ${selectedEvent?.title}. Check your email for details.`
    });
    setSelectedEvent(null);
    setRsvpData({ name: "", email: "", phone: "" });
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
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
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
              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full" 
                onClick={() => setSelectedEvent(event)}
                disabled={event.registered >= event.capacity}
              >
                {event.registered >= event.capacity ? "Event Full" : "Register Now"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register for {event.title}</DialogTitle>
                <DialogDescription>
                  Fill out the form below to reserve your spot
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRSVP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={rsvpData.phone}
                    onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
                  <p className="font-medium">Event Details:</p>
                  <p className="text-muted-foreground">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
                <Button type="submit" className="w-full">
                  Confirm Registration
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterEvents().map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="awareness" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterEvents("awareness").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workshop" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterEvents("workshop").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fundraising" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterEvents("fundraising").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Events;
