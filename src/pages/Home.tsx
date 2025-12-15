import heroImage from "@/assets/bg.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, HandHeart, Heart, Phone, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center ">
        <div
          className="absolute inset-0 bg-fixed"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              From Awareness to Action – fight against
              <span className="text-primary"> Oral cancer.</span>
            </h1>
            <p className="text-xl font-semibold text-muted-foreground">
              From early screening to ongoing support, we stand with individuals and communities to make a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/donate">Make a Donation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Make a Difference</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive approach supports cancer patients and their families at every step of their journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Early Detection First</h3>
              <p className="text-muted-foreground">
                We focus on identifying oral cancer at its earliest stage through routine dental screenings and community-based examinations—when treatment is most effective.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <Users className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Awareness That Leads to Action</h3>
              <p className="text-muted-foreground">
                We educate people to recognize early warning signs, practice self-examination, and reduce risk factors like tobacco and areca nut use.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <Target className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dentists as Frontline Defenders</h3>
              <p className="text-muted-foreground">
                We empower dental professionals with screening protocols and referral pathways, making oral cancer checks a standard part of every dental visit.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <Target className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reaching the Unreached</h3>
              <p className="text-muted-foreground">
                Through free screening camps and outreach programs, we bring early detection services to underserved and high-risk communities.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <Target className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Support Beyond Diagnosis</h3>
              <p className="text-muted-foreground">
                We help patients navigate referrals, treatment pathways, and emotional challenges—ensuring continuity of care after detection.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <Target className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prevention for the Future</h3>
              <p className="text-muted-foreground">
                By combining education, clinical expertise, and community partnerships, we work toward reducing late-stage oral cancer diagnoses.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Patients Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">250+</div>
              <div className="text-muted-foreground">Active Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">$2M+</div>
              <div className="text-muted-foreground">Funds Raised</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Sections */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <HandHeart className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-2xl font-bold">Get Involved</h3>
              <p className="text-muted-foreground">
                Join our community of volunteers making a real difference in patients' lives.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/volunteer">Learn More</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <BookOpen className="h-16 w-16 text-secondary mx-auto" />
              <h3 className="text-2xl font-bold">Awareness</h3>
              <p className="text-muted-foreground">
                Be aware about how to protect yourself and prevent oral cancer.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/awareness">Learn more</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <Phone className="h-16 w-16 text-accent mx-auto" />
              <h3 className="text-2xl font-bold">Need Help?</h3>
              <p className="text-muted-foreground">
                Reach out to our support team for assistance and resources.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
