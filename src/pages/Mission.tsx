import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Mission = () => {
  const goals = [
    "Provide comprehensive support services to cancer patients and their families",
    "Reduce financial burden through direct assistance and resource navigation",
    "Promote early detection and prevention through awareness campaigns",
    "Foster a supportive community where no one faces cancer alone",
    "Advocate for better cancer care policies and patient rights",
    "Fund innovative research for improved treatments and outcomes",
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To empower and support individuals and families affected by cancer through compassionate care, comprehensive resources, and unwavering hope.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What Drives Us</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Every day, thousands of individuals receive a cancer diagnosis that changes their lives forever. Beyond the medical treatments and hospital visits, they face emotional, financial, and practical challenges that can feel overwhelming.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Hope & Healing exists to bridge the gap between diagnosis and recovery, providing the support systems, resources, and compassionate care that enable patients to focus on healing while we handle the rest.
              </p>
              <p className="text-lg text-muted-foreground">
                We envision a world where every cancer patient has access to the support they need, where no family faces financial ruin due to medical bills, and where hope remains alive even in the darkest moments.
              </p>
            </div>
          </Card>
        </section>

        {/* Goals */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Goals</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <Card key={index} className="p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">{goal}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Areas */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Areas of Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Patient Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Financial assistance programs</li>
                <li>• Transportation support</li>
                <li>• Nutritional guidance</li>
                <li>• Home care coordination</li>
                <li>• Medical equipment access</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4 text-secondary">Family Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Support group facilitation</li>
                <li>• Mental health counseling</li>
                <li>• Caregiver training</li>
                <li>• Respite care programs</li>
                <li>• Children's programs</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4 text-accent">Community Outreach</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Education workshops</li>
                <li>• Screening events</li>
                <li>• Awareness campaigns</li>
                <li>• Prevention programs</li>
                <li>• Research funding</li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mission;
