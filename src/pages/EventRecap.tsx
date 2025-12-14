import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, User, ArrowLeft, Calendar, MapPin, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import blogHero from "@/assets/blog-hero.jpg";

interface EventRecap {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  images: string[] | null;
  author: string;
  created_at: string;
  linked_event_id: string | null;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

const EventRecap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recap, setRecap] = useState<EventRecap | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRecap();
    }
  }, [id]);

  const fetchRecap = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("status", "published")
        .single();

      if (error) throw error;
      setRecap(data);

      if (data?.linked_event_id) {
        const { data: eventData } = await supabase
          .from("events")
          .select("*")
          .eq("id", data.linked_event_id)
          .single();

        setEvent(eventData);
      }
    } catch (error: any) {
      console.error("Error fetching recap:", error);
      toast.error("Failed to load event recap");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading event recap...</p>
      </div>
    );
  }

  if (!recap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Recap Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The event recap you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/events")}>Back to Events</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allImages = [
    ...(recap.image ? [recap.image] : []),
    ...(recap.images || []),
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/events")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>

        <article>
          <div className="mb-8">
            <Badge className="mb-4">Event Recap</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {recap.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{recap.excerpt}</p>
          </div>

          {/* Event Details Card */}
          {event && (
            <Card className="mb-8 bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Event Details</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Image */}
          {allImages.length > 0 && (
            <div className="relative h-[500px] overflow-hidden rounded-lg mb-8">
              <img
                src={allImages[0]}
                alt={recap.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-5 h-5" />
              <span>{recap.author}</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-muted-foreground">
              {new Date(recap.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {recap.content}
            </div>
          </div>

          {/* Additional Images Gallery */}
          {allImages.length > 1 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Event Gallery</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allImages.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`Event photo ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Buttons */}
          <div className="flex items-center gap-4 mb-12 pb-12 border-b">
            <span className="font-semibold">Share this recap:</span>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" asChild>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${recap.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${recap.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a
                  href={`mailto:?subject=${recap.title}&body=Check out this event recap: ${shareUrl}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Author Info */}
          <Card className="bg-muted/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <p className="font-semibold text-lg">{recap.author}</p>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default EventRecap;
