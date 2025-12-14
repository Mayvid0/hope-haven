import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Activity, 
  Apple, 
  Sun, 
  Cigarette, 
  Weight,
  Shield,
  Stethoscope,
  Download,
  BookOpen,
  Video,
  FileText,
  Calendar,
  MapPin,
  Clock,
  Users
} from "lucide-react";
import heroImg from "@/assets/awareness-hero.jpg";
import screeningImg from "@/assets/awareness-screening.jpg";
import educationImg from "@/assets/awareness-education.jpg";
import { supabase } from "@/integrations/supabase/client";

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
      case 'video':
        return Video;
      case 'pdf':
      case 'word':
      case 'excel':
      case 'powerpoint':
      default:
        return FileText;
    }
  };

  const preventionTips = [
    {
      icon: Cigarette,
      title: "Avoid Tobacco",
      description: "Tobacco use is the single greatest avoidable risk factor for cancer mortality worldwide, causing an estimated 22% of cancer deaths."
    },
    {
      icon: Activity,
      title: "Stay Active",
      description: "Regular physical activity can help reduce the risk of several types of cancer. Aim for at least 150 minutes of moderate exercise per week."
    },
    {
      icon: Apple,
      title: "Healthy Diet",
      description: "Eat plenty of fruits, vegetables, whole grains, and lean proteins. Limit processed meats, red meat, and sugary drinks."
    },
    {
      icon: Weight,
      title: "Maintain Healthy Weight",
      description: "Being overweight or obese increases the risk of several cancers. Maintain a healthy body weight through diet and exercise."
    },
    {
      icon: Sun,
      title: "Sun Protection",
      description: "Protect your skin from harmful UV rays. Use sunscreen, wear protective clothing, and avoid tanning beds and midday sun."
    },
    {
      icon: Shield,
      title: "Get Vaccinated",
      description: "Vaccines for HPV and Hepatitis B can help prevent certain types of cancer. Consult your healthcare provider about vaccinations."
    }
  ];

  const earlyDetectionSigns = [
    {
      category: "General Warning Signs",
      signs: [
        "Unexplained weight loss of 10 pounds or more",
        "Persistent fatigue that doesn't improve with rest",
        "Fever that comes and goes without explanation",
        "Pain that persists and has no clear cause",
        "Changes in skin appearance or new growths"
      ]
    },
    {
      category: "Specific Symptoms",
      signs: [
        "A lump or thickening that can be felt under the skin",
        "Changes in bowel or bladder habits",
        "Persistent cough or trouble breathing",
        "Difficulty swallowing or persistent indigestion",
        "Unusual bleeding or discharge"
      ]
    }
  ];

  const screeningGuidelines = [
    {
      type: "Breast Cancer",
      description: "Regular mammograms and clinical breast exams are crucial for early detection.",
      recommendations: [
        "Women ages 40-44: Annual screening mammogram (optional, discuss with doctor)",
        "Women ages 45-54: Annual screening mammogram",
        "Women 55 and older: Mammogram every 1-2 years or continue yearly",
        "Monthly breast self-exams at any age",
        "Clinical breast exam every 1-3 years for women in their 20s and 30s"
      ]
    },
    {
      type: "Colorectal Cancer",
      description: "Screening can often find colorectal cancer early, when treatment works best.",
      recommendations: [
        "Average risk: Begin screening at age 45",
        "Colonoscopy every 10 years",
        "CT colonography every 5 years",
        "Flexible sigmoidoscopy every 5 years",
        "Stool-based tests annually (FIT or gFOBT)",
        "Higher frequency for those with family history or risk factors"
      ]
    },
    {
      type: "Cervical Cancer",
      description: "Regular screening can prevent most cervical cancers by detecting precancerous changes.",
      recommendations: [
        "Ages 21-29: Pap test every 3 years",
        "Ages 30-65: Pap test + HPV test every 5 years (preferred), or Pap test alone every 3 years",
        "Over 65: May discontinue if adequate prior screening and not high risk",
        "HPV vaccination recommended for ages 9-26"
      ]
    },
    {
      type: "Lung Cancer",
      description: "Low-dose CT screening can detect lung cancer at an early, more treatable stage.",
      recommendations: [
        "Ages 50-80 with 20 pack-year smoking history",
        "Current smokers or quit within past 15 years",
        "Annual low-dose CT scan (LDCT)",
        "Discuss screening benefits and risks with healthcare provider",
        "Screening not recommended for those with serious health conditions"
      ]
    },
    {
      type: "Prostate Cancer",
      description: "Screening decisions should be made after discussing with a healthcare provider.",
      recommendations: [
        "Age 50: Discuss PSA screening with doctor (average risk men)",
        "Age 45: Consider screening for higher risk (African American men, family history)",
        "Age 40: For those with multiple first-degree relatives with prostate cancer",
        "PSA blood test and digital rectal exam (DRE)",
        "Frequency depends on PSA level and risk factors"
      ]
    },
    {
      type: "Skin Cancer",
      description: "Regular skin self-exams and professional skin exams can detect skin cancer early.",
      recommendations: [
        "Monthly skin self-examinations for everyone",
        "Professional skin exam annually for high-risk individuals",
        "Watch for changes in moles using the ABCDE rule",
        "Higher risk: Fair skin, many moles, family history, history of sunburns",
        "Protect skin from UV exposure year-round"
      ]
    }
  ];

  // Static educational resources removed - now using database resources

  const upcomingEvents = [
    {
      title: "Breast Cancer Awareness Walk",
      date: "October 15, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Central Park, Main Plaza",
      attendees: "500+ expected",
      description: "Join us for our annual awareness walk. Registration includes a t-shirt, breakfast, and educational materials."
    },
    {
      title: "Free Skin Cancer Screening",
      date: "November 3, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Hope & Healing Center",
      attendees: "Limited spots",
      description: "Professional dermatologists will provide free skin examinations. Appointments required."
    },
    {
      title: "Cancer Prevention Seminar",
      date: "November 12, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Community Health Center",
      attendees: "100 seats available",
      description: "Expert panel discussion on lifestyle choices and cancer prevention strategies. Q&A session included."
    },
    {
      title: "Colorectal Cancer Awareness Day",
      date: "December 1, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Medical District Plaza",
      attendees: "Open to public",
      description: "Information booths, free screening vouchers, and educational presentations about colorectal cancer."
    }
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
          <Badge className="mb-4 text-base px-4 py-1">Cancer Awareness & Prevention</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Knowledge Saves Lives
          </h1>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto">
            Empowering you with information about cancer prevention, early detection, and screening guidelines
          </p>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Cancer Prevention Tips</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Up to 50% of cancers are preventable through lifestyle modifications and healthy choices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preventionTips.map((tip) => (
              <Card key={tip.title} className="hover:shadow-lg transition-shadow">
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Early Detection Guidelines</h2>
              <p className="text-lg text-muted-foreground">
                Recognizing warning signs early can significantly improve treatment outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {earlyDetectionSigns.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.signs.map((sign, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
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
                  <strong className="text-foreground">Important:</strong> Having one or more of these symptoms doesn't mean you have cancer. 
                  However, if symptoms persist for more than two weeks, consult your healthcare provider for evaluation.
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Screening Recommendations by Cancer Type</h2>
              <p className="text-lg text-muted-foreground">
                Regular screening can detect cancer before symptoms appear, when treatment is most effective
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {screeningGuidelines.map((guideline, index) => (
                <AccordionItem key={guideline.type} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {guideline.type}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">{guideline.description}</p>
                    <ul className="space-y-2">
                      {guideline.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{rec}</span>
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
                  <strong className="text-foreground">Note:</strong> These are general guidelines. Your healthcare provider may recommend 
                  different screening schedules based on your personal and family medical history, risk factors, and other considerations.
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Educational Resources</h2>
              <p className="text-lg text-muted-foreground">
                Download free resources to learn more about cancer prevention and early detection
              </p>
            </div>

            {loadingResources ? (
              <div className="text-center py-8 text-muted-foreground">Loading resources...</div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No downloadable resources available at this time. Check back soon!
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource) => {
                  const IconComponent = getFileIcon(resource.file_type);
                  return (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">{resource.file_type}</Badge>
                                <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {resource.description && (
                          <CardDescription className="mb-4">{resource.description}</CardDescription>
                        )}
                        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                          <a href={resource.file_url} target="_blank" rel="noopener noreferrer" download>
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

      {/* Upcoming Events */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Upcoming Awareness Events</h2>
              <p className="text-lg text-muted-foreground">
                Join us at community events focused on education, screening, and support
              </p>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="bg-primary text-primary-foreground p-6 md:w-48 flex flex-col items-center justify-center text-center">
                      <Calendar className="w-8 h-8 mb-2" />
                      <div className="text-sm font-semibold">{event.date}</div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
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
                      <p className="text-muted-foreground mb-4">{event.description}</p>
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed, Stay Healthy</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest information on cancer prevention, screening guidelines, and upcoming events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Subscribe to Newsletter
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Us for More Info
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awareness;
