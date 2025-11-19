import { Card } from "@/components/ui/card";
import { Heart, Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded on compassion and driven by hope, we're dedicated to supporting cancer patients and their families through every step of their journey.
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-muted to-background">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hope & Healing was founded in 2010 by a group of cancer survivors, healthcare professionals, and community leaders who recognized the immense challenges faced by cancer patients beyond medical treatment.
                </p>
                <p>
                  What began as a small support group has grown into a comprehensive organization serving thousands of patients and families each year. We believe that no one should face cancer alone, and that every patient deserves access to the support, resources, and compassion they need to fight this disease with dignity and hope.
                </p>
                <p>
                  Today, we're proud to work alongside dedicated volunteers, healthcare providers, and community partners to make a lasting impact in the lives of those affected by cancer.
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
                Every interaction is guided by empathy, understanding, and genuine care for those we serve.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Users className="h-12 w-12 text-secondary mx-auto" />
              <h3 className="text-xl font-semibold">Community</h3>
              <p className="text-sm text-muted-foreground">
                Together we're stronger. We build supportive networks that uplift and empower.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Target className="h-12 w-12 text-accent mx-auto" />
              <h3 className="text-xl font-semibold">Impact</h3>
              <p className="text-sm text-muted-foreground">
                We're committed to making measurable, meaningful differences in patients' lives.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <Award className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                We strive for the highest standards in everything we do, from patient care to advocacy.
              </p>
            </Card>
          </div>
        </section>

        {/* Leadership Preview */}
        <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Led by Experience, Driven by Heart</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our leadership team brings together decades of experience in healthcare, non-profit management, and community advocacy.
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
