import educationImg from "@/assets/awareness-education.jpg";
import heroImg from "@/assets/awareness-hero.jpg";
import screeningImg from "@/assets/awareness-screening.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity,
  Apple,
  Cigarette,
  Download,
  FileText,
  Shield,
  Stethoscope,
  Sun,
  Video,
  Weight
} from "lucide-react";
import { useEffect, useState } from "react";

interface AwarenessResource {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  category: string;
}

const Awareness = () => {
  const [resources, setResources] = useState<AwarenessResource[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data, error } = await supabase
          .from("awareness_resources")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, []);

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "video":
        return Video;
      case "pdf":
      case "word":
      case "excel":
      case "powerpoint":
      default:
        return FileText;
    }
  };

  const preventionTips = [
    {
      icon: Cigarette,
      title: "Avoid Tobacco and limit alcohol",
      description:
        "Tobacco use is responsible for up to 80% of oral cancers, and combining it with alcohol significantly increases the risk. Avoid smoking, chewing tobacco, and limit alcohol consumption to protect both oral and overall health.",
    },
    {
      icon: Activity,
      title: "Maintain Oral Hygiene",
      description:
        "Brushing twice daily, flossing, and keeping your mouth clean reduces the risk of oral infections and lesions that can contribute to cancer development. Good oral hygiene is linked to a 30–40% lower risk of oral diseases.",
    },
    {
      icon: Apple,
      title: "Healthy Diet",
      description:
        "Consuming fruits, vegetables, and foods rich in antioxidants supports oral and general health. Diets high in vitamins A, C, and E are associated with up to 50% lower risk of oral cancer.",
    },
    {
      icon: Weight,
      title: "Regular Checkups",
      description:
        "Visiting your dentist every 6 months ensures early detection of suspicious changes. Early detection increases the 5-year survival rate from 50% to over 80% in oral cancer cases.",
    },
    {
      icon: Sun,
      title: "Self-Examine Your Mouth",
      description:
        "Protect your skin from harmful UV rays. Use sunscreen, wear protective clothing, and avoid tanning beds and midday sun.",
    },
    {
      icon: Shield,
      title: "Get Vaccinated",
      description:
        "Regularly check for sores, red or white patches, lumps, or unusual changes. Detecting abnormalities early can lead to timely intervention and better outcomes.",
    },
    {
      icon: Shield,
      title: "Stay Active & Hydrated",
      description:
        "Maintaining physical activity, drinking plenty of water, and avoiding irritants like very hot or processed foods support overall wellbeing and help reduce cancer risk. Healthy lifestyle habits can lower general cancer risk by up to 30%.",
    },
  ];

  const earlyDetectionSigns = [
    {
      category: "General Warning Signs",
      signs: [
        "Persistent mouth sores that don’t heal within 2 weeks",
        "Unexplained pain or discomfort in the mouth or throat",
        "Difficulty chewing, swallowing, or speaking",
        "Numbness or tingling in the lips, tongue, or face",
        "Unusual bleeding in the mouth",
      ],
    },
    {
      category: "Specific Symptoms",
      signs: [
        " White or red patches on the gums, tongue, or lining of the mouth",
        "Lumps or thickened areas in the mouth, neck, or jaw",
        "Sores that bleed easily or do not heal",
        "Loose teeth without obvious cause",
        "Persistent bad breath or a feeling of something stuck in the throat",
        "Pain radiating to the ear without ear infection",
      ],
    },
  ];

  const screeningGuidelines = [
    {
      type: "Tongue Cancer",
      description:
        "Screening: Check for persistent lumps, red or white patches, or ulcers; dentist examination every 6 months.",
      recommendations: [
        "Prevalence: Accounts for 25–30% of all oral cancers.",
        "High-Risk Age: Most common in 40–70 years.",
        "Risk Factors: Tobacco (smoked and smokeless), alcohol, HPV infection.",
        "Mortality Note: Early detection can raise 5-year survival from ~50% to 80–85%.",
      ],
    },
    {
      type: "Gum (Gingival) Cancer",
      description:
        "Screening: Look for swelling, bleeding, or unusual growths; dental checkups recommended every 6 months.",
      recommendations: [
        "Prevalence: About 10–15% of oral cancers.",
        "High-Risk Age: Usually 50–70 years.",
        "Risk Factors: Poor oral hygiene, chronic irritation from teeth or dentures, tobacco.",
        "Prognosis: Early-stage detection has ~70–90% survival rate.",
      ],
    },
    {
      type: "Floor of Mouth Cancer",
      description:
        "Screening: Self-examine for lumps, ulcers, or red/white patches; dental visits for visual and palpation exams.",
      recommendations: [
        "Prevalence: Around 7–10% of oral cancers.",
        "High-Risk Age: Typically 45–65 years.",
        "Risk Factors: Heavy tobacco and alcohol use, men more affected.",
        "Prognosis: Early detection increases survival to ~80%, late-stage drops below 50%.",
      ],
    },
    {
      type: "Palate Cancer",
      description:
        "Screening: Examine for persistent ulceration or thickening on the hard or soft palate; regular oral exams by dentists.",
      recommendations: [
        "Prevalence: Roughly 5–7% of oral cancers.",
        "High-Risk Age: Mostly affects people 50+ years.",
        "Risk Factors: Tobacco, alcohol, poorly fitted dentures.",
        "Prognosis: Early detection greatly improves outcomes; late detection has <50% 5-year survival.",
      ],
    },
    {
      type: "Lip Cancer",
      description:
        "Screening: Inspect lips for sores, crusts, or non-healing ulcers; high vigilance for sun-exposed areas.",
      recommendations: [
        "Prevalence: Accounts for 10–15% of oral cancers; lower lip more affected than upper.",
        "High-Risk Age: Common in 60+ years, especially men.",
        "Risk Factors: Chronic sun exposure, smoking, alcohol.",
        "Prognosis: Usually detected early; 90% survival if treated promptly.",
      ],
    },
    {
      type: "Oropharyngeal Cancer (Throat, Tonsil, Base of Tongue)",
      description:
        "Screening: Watch for persistent sore throat, difficulty swallowing, ear pain, or lumps in the neck; ENT or dental exams recommended.",
      recommendations: [
        "Prevalence: Accounts for 15–20% of head and neck cancers.",
        "High-Risk Age: Most common in 50–70 years, but HPV-related cases are rising in younger adults (30–45 years).",
        "Risk Factors: HPV infection, tobacco, alcohol, poor oral hygiene.",
        "Prognosis: HPV-positive tumors respond better to treatment; overall 5-year survival ~60–70%.",
      ],
    },
  ];

  // Static educational resources removed - now using database resources

  const upcomingEvents = [
    {
      title: "Breast Cancer Awareness Walk",
      date: "October 15, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Central Park, Main Plaza",
      attendees: "500+ expected",
      description:
        "Join us for our annual awareness walk. Registration includes a t-shirt, breakfast, and educational materials.",
    },
    {
      title: "Free Skin Cancer Screening",
      date: "November 3, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Hope & Healing Center",
      attendees: "Limited spots",
      description:
        "Professional dermatologists will provide free skin examinations. Appointments required.",
    },
    {
      title: "Cancer Prevention Seminar",
      date: "November 12, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Community Health Center",
      attendees: "100 seats available",
      description:
        "Expert panel discussion on lifestyle choices and cancer prevention strategies. Q&A session included.",
    },
    {
      title: "Colorectal Cancer Awareness Day",
      date: "December 1, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Medical District Plaza",
      attendees: "Open to public",
      description:
        "Information booths, free screening vouchers, and educational presentations about colorectal cancer.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cancer awareness and prevention"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 text-base px-4 py-1">
            Cancer Awareness & Prevention
          </Badge>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-foreground">
            Awareness saves lives
          </h1>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto">
            Learn how to protect yourself from oral cancer with prevention tips,
            early detection guidance, and regular dental checkups.
          </p>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Cancer Prevention Tips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Up to 80–90% of oral cancers can be prevented by avoiding tobacco
              and alcohol, maintaining oral hygiene, and getting regular
              screenings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preventionTips.map((tip) => (
              <Card
                key={tip.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <tip.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Early Detection */}
      <section className="py-16 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Early Detection Guidelines
              </h2>
              <p className="text-lg text-muted-foreground">
                Recognizing warning signs early can significantly improve
                treatment outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {earlyDetectionSigns.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.signs.map((sign, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> If you
                  notice any of these signs for more than 2 weeks, consult a
                  dentist immediately. Early detection greatly improves
                  treatment outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Screening Recommendations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <img
                src={screeningImg}
                alt="Cancer screening equipment"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Screening Recommendations by Cancer Type
              </h2>
              <p className="text-lg text-muted-foreground">
                Regular screenings and early detection are key to preventing
                serious outcomes from oral and head & neck cancers
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {screeningGuidelines.map((guideline, index) => (
                <AccordionItem
                  key={guideline.type}
                  value={`item-${index}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {guideline.type}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">
                      {guideline.description}
                    </p>
                    <ul className="space-y-2">
                      {guideline.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {rec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Card className="mt-8 bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> These are
                  general guidelines—your dentist or healthcare professional can
                  provide personalized advice based on your medical history,
                  family history, risk factors, and other considerations
                  considerations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <img
                src={educationImg}
                alt="Cancer education workshop"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Educational Resources
              </h2>
              <p className="text-lg text-muted-foreground">
                Download free resources to learn more about cancer prevention
                and early detection
              </p>
            </div>

            {loadingResources ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading resources...
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No downloadable resources available at this time. Check back
                soon!
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource) => {
                  const IconComponent = getFileIcon(resource.file_type);
                  return (
                    <Card
                      key={resource.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {resource.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {resource.file_type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {resource.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {resource.description && (
                          <CardDescription className="mb-4">
                            {resource.description}
                          </CardDescription>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                          asChild
                        >
                          <a
                            href={resource.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <Download className="w-4 h-4" />
                            Download Resource
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Upcoming Awareness Events
              </h2>
              <p className="text-lg text-muted-foreground">
                Join us at community events focused on education, screening, and
                support
              </p>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.title}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="md:flex">
                    <div className="bg-primary text-primary-foreground p-6 md:w-48 flex flex-col items-center justify-center text-center">
                      <Calendar className="w-8 h-8 mb-2" />
                      <div className="text-sm font-semibold">{event.date}</div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {event.description}
                      </p>
                      <Button size="sm" className="gap-2">
                        Register Now <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Informed, Stay Healthy
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest information on cancer
            prevention, screening guidelines, and upcoming events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Subscribe to Newsletter
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Contact Us for More Info
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awareness;
