import { Card } from "@/components/ui/card";
import { Mail, Linkedin } from "lucide-react";
import directorImage from "@/assets/team-director.jpg";
import medicalImage from "@/assets/team-medical.jpg";
import coordinatorImage from "@/assets/team-coordinator.jpg";
import volunteerImage from "@/assets/team-volunteer.jpg";
import outreachImage from "@/assets/team-outreach.jpg";
import counselorImage from "@/assets/team-counselor.jpg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
}

const leadership: TeamMember[] = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Executive Director",
    bio: "With over 20 years of experience in healthcare administration and a personal journey as a cancer survivor, Dr. Mitchell leads our organization with compassion and strategic vision. She has pioneered numerous patient support programs that have become models for cancer care organizations nationwide.",
    image: directorImage,
    email: "s.mitchell@hopeandhealing.org",
    linkedin: "#",
  },
  {
    name: "Dr. James Chen",
    role: "Medical Director",
    bio: "Board-certified oncologist with 15 years of clinical experience. Dr. Chen oversees our medical advisory board and ensures our programs align with the latest evidence-based practices in cancer treatment and patient care. He is passionate about integrating holistic support with traditional medicine.",
    image: medicalImage,
    email: "j.chen@hopeandhealing.org",
    linkedin: "#",
  },
];

const staff: TeamMember[] = [
  {
    name: "Maria Rodriguez",
    role: "Patient Services Coordinator",
    bio: "Maria manages our day-to-day patient assistance programs, connecting families with resources they need. Her bilingual skills and cultural competency have been invaluable in expanding our reach to underserved communities.",
    image: coordinatorImage,
    email: "m.rodriguez@hopeandhealing.org",
  },
  {
    name: "David Thompson",
    role: "Volunteer Programs Manager",
    bio: "David coordinates our network of 250+ volunteers, organizing training programs and matching volunteers with opportunities that align with their skills and passion. His background in social work brings depth to our volunteer experience.",
    image: volunteerImage,
    email: "d.thompson@hopeandhealing.org",
  },
  {
    name: "Aisha Patel",
    role: "Community Outreach Specialist",
    bio: "Aisha leads our awareness campaigns and educational workshops across the region. She develops partnerships with schools, community centers, and healthcare facilities to promote early detection and cancer prevention.",
    image: outreachImage,
    email: "a.patel@hopeandhealing.org",
  },
  {
    name: "Robert Williams",
    role: "Patient Counselor",
    bio: "As a licensed clinical social worker specializing in oncology, Robert provides emotional support and counseling to patients and their families. He facilitates our support groups and offers individual counseling sessions.",
    image: counselorImage,
    email: "r.williams@hopeandhealing.org",
  },
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-primary font-medium">{member.role}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        <div className="flex gap-3 pt-2">
          <a
            href={`mailto:${member.email}`}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="h-5 w-5" />
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${member.name}'s LinkedIn profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

const Teams = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated professionals and compassionate individuals working tirelessly to support cancer patients and their families every day.
          </p>
        </div>

        {/* Leadership Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our executive team brings decades of combined experience in healthcare, non-profit management, and patient advocacy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {leadership.map((member) => (
              <TeamMemberCard key={member.email} member={member} />
            ))}
          </div>
        </section>

        {/* Staff Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Staff</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The heart of our organization - these professionals work directly with patients, families, and volunteers to deliver our programs and services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <TeamMemberCard key={member.email} member={member} />
            ))}
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="mt-20">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for passionate, dedicated individuals to join our mission. Whether you're interested in a career or volunteer opportunity, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
              >
                Volunteer With Us
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8"
              >
                Career Inquiries
              </a>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Teams;
