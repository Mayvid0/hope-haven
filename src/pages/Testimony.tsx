import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import survivor1 from "@/assets/testimony-survivor1.jpg";
import survivor2 from "@/assets/testimony-survivor2.jpg";
import survivor3 from "@/assets/testimony-survivor3.jpg";
import survivor4 from "@/assets/testimony-survivor4.jpg";
import family1 from "@/assets/testimony-family1.jpg";
import family2 from "@/assets/testimony-family2.jpg";

interface Testimony {
  id: number;
  name: string;
  cancerType: string;
  category: "survivor" | "patient" | "family";
  story: string;
  image: string;
  yearDiagnosed?: number;
  relationship?: string;
}

const testimonies: Testimony[] = [
  {
    id: 1,
    name: "Emily Thompson",
    cancerType: "Breast Cancer",
    category: "survivor",
    story: "When I was diagnosed with breast cancer at 42, I felt my world collapse. But Hope & Healing connected me with a support group that changed everything. The financial assistance helped me focus on treatment without worrying about bills. Today, I'm 3 years cancer-free and volunteering to help others on their journey. This organization gave me hope when I needed it most.",
    image: survivor1,
    yearDiagnosed: 2020,
  },
  {
    id: 2,
    name: "Marcus Davis",
    cancerType: "Lung Cancer",
    category: "survivor",
    story: "Stage 3 lung cancer wasn't just a physical battle—it was mental and emotional too. The counseling services and support groups at Hope & Healing helped me process my fear and anxiety. Their transportation program ensured I never missed a treatment. I'm grateful to be here today, 2 years in remission, and I want others to know there is always hope.",
    image: survivor2,
    yearDiagnosed: 2021,
  },
  {
    id: 3,
    name: "Sophie Martinez",
    cancerType: "Leukemia",
    category: "survivor",
    story: "Being diagnosed with leukemia at 24 felt so unfair. I had just started my career and life. Hope & Healing's young adult program connected me with others my age going through similar struggles. They understood my unique challenges. The organization also helped cover my medical expenses when insurance fell short. Today, I'm in remission and pursuing my dreams again.",
    image: survivor3,
    yearDiagnosed: 2022,
  },
  {
    id: 4,
    name: "Robert Chen",
    cancerType: "Colorectal Cancer",
    category: "survivor",
    story: "At 65, colorectal cancer diagnosis came as a shock. The journey through surgery and chemotherapy was challenging, but Hope & Healing's home care coordination made recovery manageable. They provided equipment, arranged nursing visits, and even delivered nutritious meals. Five years later, I'm healthy and enjoying time with my grandchildren. I'm forever grateful for their comprehensive support.",
    image: survivor4,
    yearDiagnosed: 2018,
  },
  {
    id: 5,
    name: "Jennifer Wilson",
    cancerType: "Multiple Cancers",
    category: "family",
    relationship: "Caregiver & Daughter",
    story: "Watching my mother battle ovarian cancer was the hardest thing I've ever experienced. Hope & Healing's caregiver support program was a lifeline. They taught me how to care for her, connected me with respite services when I needed a break, and provided counseling to help me cope. Though we lost mom last year, I'm grateful we had quality time together thanks to this organization's support.",
    image: family1,
  },
  {
    id: 6,
    name: "David Park",
    cancerType: "Lymphoma",
    category: "family",
    relationship: "Father & Advocate",
    story: "When my 16-year-old son was diagnosed with lymphoma, our family was devastated. Hope & Healing provided support for our whole family—counseling for his younger siblings, financial help with medical bills, and a support network that understood what we were going through. My son is now in remission, and we're all stronger because of the compassionate care we received.",
    image: family2,
  },
];

const cancerTypes = ["All Types", "Breast Cancer", "Lung Cancer", "Leukemia", "Colorectal Cancer", "Lymphoma", "Multiple Cancers"];
const categories = [
  { value: "all", label: "All Stories" },
  { value: "survivor", label: "Survivors" },
  { value: "patient", label: "Current Patients" },
  { value: "family", label: "Family & Caregivers" },
];

const Testimony = () => {
  const [selectedCancerType, setSelectedCancerType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTestimonies = testimonies.filter((testimony) => {
    const cancerTypeMatch = selectedCancerType === "All Types" || testimony.cancerType === selectedCancerType;
    const categoryMatch = selectedCategory === "all" || testimony.category === selectedCategory;
    return cancerTypeMatch && categoryMatch;
  });

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
                    <img
                      src={testimony.image}
                      alt={testimony.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{testimony.name}</h3>
                        {testimony.relationship && (
                          <p className="text-sm text-muted-foreground">{testimony.relationship}</p>
                        )}
                      </div>
                      <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{testimony.cancerType}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {testimony.category === "survivor"
                          ? "Survivor"
                          : testimony.category === "patient"
                          ? "Current Patient"
                          : "Family"}
                      </Badge>
                      {testimony.yearDiagnosed && (
                        <Badge variant="outline">Diagnosed {testimony.yearDiagnosed}</Badge>
                      )}
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
            <Button asChild size="lg">
              <a href="/contact">Submit Your Story</a>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Testimony;
