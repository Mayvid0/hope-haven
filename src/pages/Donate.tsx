import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Stethoscope, GraduationCap, CheckCircle } from "lucide-react";
import donateHero from "@/assets/donate-hero.jpg";
import { toast } from "sonner";

const givingTiers = [
  {
    amount: 25,
    title: "Care Package",
    description: "Provides comfort items for one patient during treatment",
    icon: Heart,
  },
  {
    amount: 50,
    title: "Transportation Support",
    description: "Covers gas cards for one family's trips to treatment",
    icon: Users,
  },
  {
    amount: 100,
    title: "Medical Supplies",
    description: "Funds essential medical supplies for multiple patients",
    icon: Stethoscope,
  },
  {
    amount: 250,
    title: "Research Grant",
    description: "Contributes to breakthrough cancer research initiatives",
    icon: GraduationCap,
  },
];

const activeCampaigns = [
  {
    title: "Pediatric Cancer Research Fund",
    raised: 45000,
    goal: 75000,
    supporters: 234,
  },
  {
    title: "Patient Support Services",
    raised: 32000,
    goal: 50000,
    supporters: 156,
  },
  {
    title: "Community Wellness Programs",
    raised: 18500,
    goal: 25000,
    supporters: 89,
  },
];

const recentDonors = [
  { name: "Sarah M.", amount: 100, message: "In memory of my mother" },
  { name: "Anonymous", amount: 250, message: "Keep up the great work!" },
  { name: "David & Lisa K.", amount: 50, message: "Proud to support this cause" },
  { name: "James R.", amount: 500, message: "Hope for a cure" },
];

const Donate = () => {
  const [donationType, setDonationType] = useState<"one-time" | "recurring">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error("Please select or enter a valid donation amount");
      return;
    }
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success(
      `Thank you for your ${donationType === "recurring" ? "monthly" : ""} donation of $${amount}! (Stripe integration pending)`
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${donateHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Make a Difference Today
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your generosity brings hope and healing to those fighting cancer. Every donation saves lives.
          </p>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Active Campaigns</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activeCampaigns.map((campaign, index) => {
              const progress = (campaign.raised / campaign.goal) * 100;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.supporters} supporters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold">${campaign.raised.toLocaleString()}</span>
                          <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {Math.round(progress)}% funded
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giving Tiers & Donation Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Giving Tiers */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Your Impact</h2>
              <div className="space-y-6 mb-8">
                {givingTiers.map((tier, index) => {
                  const Icon = tier.icon;
                  return (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedAmount === tier.amount ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedAmount(tier.amount);
                        setCustomAmount("");
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">${tier.amount}</CardTitle>
                              {selectedAmount === tier.amount && (
                                <CheckCircle className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <CardDescription className="text-base font-semibold text-foreground">
                              {tier.title}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{tier.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right: Donation Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Complete Your Donation</CardTitle>
                  <CardDescription>Secure payment processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonate} className="space-y-6">
                    {/* Donation Type */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Donation Type</Label>
                      <RadioGroup
                        value={donationType}
                        onValueChange={(value: "one-time" | "recurring") => setDonationType(value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <RadioGroupItem value="one-time" id="one-time" />
                          <Label htmlFor="one-time" className="cursor-pointer font-normal">
                            One-time
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 flex-1">
                          <RadioGroupItem value="recurring" id="recurring" />
                          <Label htmlFor="recurring" className="cursor-pointer font-normal">
                            Monthly
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Amount Selection */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Amount</Label>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {givingTiers.map((tier) => (
                          <Button
                            key={tier.amount}
                            type="button"
                            variant={selectedAmount === tier.amount ? "default" : "outline"}
                            onClick={() => {
                              setSelectedAmount(tier.amount);
                              setCustomAmount("");
                            }}
                          >
                            ${tier.amount}
                          </Button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="custom-amount" className="text-sm">
                          Or enter custom amount
                        </Label>
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(null);
                          }}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Payment Information (Placeholder) */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Payment Information</Label>
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Donate {selectedAmount || customAmount ? `$${selectedAmount || customAmount}` : ""}
                      {donationType === "recurring" ? " Monthly" : ""}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment processing. Your information is safe with us.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Recognition */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Donors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentDonors.map((donor, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{donor.name}</p>
                      <Badge variant="secondary" className="mt-1">
                        ${donor.amount}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{donor.message}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Every Dollar Counts</h2>
          <p className="text-lg text-muted-foreground mb-8">
            100% of your donation goes directly to supporting cancer patients and funding research.
            We're committed to transparency and ensuring your generosity makes the maximum impact.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">1,200+</p>
              <p className="text-muted-foreground">Patients Supported</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">$2.5M</p>
              <p className="text-muted-foreground">Raised This Year</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">95%</p>
              <p className="text-muted-foreground">Goes to Programs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
