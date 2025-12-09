import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import TestimonySubmissionForm from "@/components/TestimonySubmissionForm";

interface Testimony {
  id: string;
  name: string;
  cancer_type: string;
  category: string;
  story: string;
  image: string | null;
  created_at: string;
}

const Testimony = () => {
  const [selectedCancerType, setSelectedCancerType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Generate unique cancer types from testimonies
  const [cancerTypes, setCancerTypes] = useState<string[]>(["All Types"]);
  const categories = [
    { value: "all", label: "All Stories" },
    { value: "survivor", label: "Survivors" },
    { value: "patient", label: "Current Patients" },
    { value: "family", label: "Family & Caregivers" },
  ];

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonies')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonies(data || []);
      
      // Extract unique cancer types
      const types = Array.from(new Set(data?.map(t => t.cancer_type) || []));
      setCancerTypes(["All Types", ...types]);
    } catch (error: any) {
      console.error('Error fetching testimonies:', error);
      toast.error('Failed to load testimonies');
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonies = testimonies.filter((testimony) => {
    const cancerTypeMatch = selectedCancerType === "All Types" || testimony.cancer_type === selectedCancerType;
    const categoryMatch = selectedCategory === "all" || testimony.category === selectedCategory;
    return cancerTypeMatch && categoryMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading testimonies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stories of Hope</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from real people. These testimonies remind us why we fight and inspire us to keep going.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Filter by Cancer Type</h3>
            <div className="flex flex-wrap gap-2">
              {cancerTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedCancerType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCancerType(type)}
                  className="transition-all duration-200"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Filter by Story Type</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="transition-all duration-200"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTestimonies.length}</span>{" "}
            {filteredTestimonies.length === 1 ? "story" : "stories"}
          </p>
        </div>

        {/* Testimonies Grid */}
        {filteredTestimonies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredTestimonies.map((testimony, index) => (
              <Card
                key={testimony.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 aspect-square md:aspect-auto overflow-hidden bg-muted">
                    {testimony.image && (
                      <img
                        src={testimony.image}
                        alt={testimony.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="md:w-2/3 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{testimony.name}</h3>
                      </div>
                      <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{testimony.cancer_type}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {testimony.category === "survivor"
                          ? "Survivor"
                          : testimony.category === "patient"
                          ? "Current Patient"
                          : "Family"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">{testimony.story}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No stories match your current filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCancerType("All Types");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Share Your Story CTA */}
        <section className="mt-16">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
            <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your journey can inspire others facing similar challenges. We'd be honored to share your story of hope, courage, and resilience.
            </p>
            <TestimonySubmissionForm />
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Testimony;
