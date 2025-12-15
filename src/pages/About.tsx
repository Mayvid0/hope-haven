import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            HopeVcare is a dedicated oral cancer foundation committed to turning awareness into action. We focus on early detection, patient support, research, and community education to reduce the impact of oral cancer.
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-muted to-background">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Oral cancer often goes unnoticed until it becomes serious. Many lives are affected simply because the signs were not seen early. HopeVcare was born in 2025 from a simple thought: if oral cancer is found early, lives can be saved.
                </p>
                <p>
As dental professionals, we saw how a small mouth check could make a big difference. Yet many people — especially in communities with limited access to care—never get screened in time
                </p>
                <p>
What started as a small effort to spread awareness grew into a mission to bring early screening, education, and support directly to people — through dental clinics, community camps, and compassionate guidance.
Today, HopeVcare works with one purpose: to help people detect oral cancer early, reach the right care on time, and face the journey with hope and support.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Compassion</h3>
              <p className="text-sm text-muted-foreground">
                Empathy and patient-centered care at every stage.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                Ethics, transparency, and trust in all initiatives.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Using research and technology to improve outcomes.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Partnering with professionals, institutions, and communities.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Education</h3>
              <p className="text-sm text-muted-foreground">
                Empowering people with oral cancer knowledge.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Early detection</h3>
              <p className="text-sm text-muted-foreground">
                Promoting regular screenings and awareness.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Heart className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Rehabilitation</h3>
              <p className="text-sm text-muted-foreground">
                Supporting post-treatment recovery and well-being.
              </p>
            </Card>
            
          </div>
        </section>

        {/* Leadership Preview */}
        <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Led by Experience, Driven by Heart</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Led by dental professionals, we combine clinical experience with compassion to bring early screening and hope to communities.
            </p>
            <p className="text-muted-foreground">
              Visit our <a href="/teams" className="text-primary hover:underline font-medium">Teams page</a> to learn more about the dedicated individuals leading our mission.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
