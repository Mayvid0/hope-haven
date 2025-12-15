import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Mission = () => {
  const goals = [
    "Spread awareness about oral cancer risks, prevention, and oral hygiene.",
    "Promote early detection through screenings and timely referrals.",
    "Advance research and innovation in oral cancer understanding and treatment.",
    "Provide training and development through academic programs and workshops.",
    "Support professional growth via conferences, workshops, and publications.",
    "Engage communities to improve oral health awareness and access.",
    "Empower individuals, communities, and professionals for a healthier future.",
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To empower and support individuals and families affected by cancer
            through compassionate care, comprehensive resources, and unwavering
            hope.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                What Drives Us
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                We believe every life matters, and no one should face oral
                cancer alone. We are inspired by the courage of patients and
                families navigating uncertainty.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We are guided by the hope that early detection can change
                outcomes. We work to bring awareness to every community, school,
                and clinic. We are motivated by the simple truth that knowledge
                saves lives. We stand beside those who need support, guidance,
                and care.
              </p>
              <p className="text-lg text-muted-foreground">
                We are driven by the compassion that turns action into hope. We
                believe that together—dentists, communities, and patients—we can
                make a difference.
              </p>
            </div>
          </Card>
        </section>

        {/* Goals */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Goals</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <Card
                key={index}
                className="p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
              >
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">{goal}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Areas */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            Areas of Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">
                Patient Services
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Early oral cancer detection through screenings</li>
                <li>• Guidance and support through diagnosis and treatment</li>
                <li>• Raising awareness about oral hygiene and prevention</li>

              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4 text-secondary">
                Community Outreach
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Health education programs in schools, workplaces, and neighborhoods</li>
                <li>• Free screening camps for underserved communities</li>
                <li>• Awareness campaigns on risk factors like tobacco and betel nut</li>

              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4 text-accent">
                Dental Development
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Training dentists in early detection  and referral protocols</li>
                <li>• Workshops, conferences, and skill-building programs</li>
                <li>• Research and innovation in oral cancer care</li>

              </ul>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mission;
