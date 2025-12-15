import navlogo from "@/assets/logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <img src={navlogo} alt="HOPE-VCare Logo" className="h-10 w-auto" />
              <span>HopeVcare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting oral cancer patients with compassion, resources, and hope.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/awareness" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Awareness Programs
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@hopeandhealing.org</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+91 9622110222</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>WHITE Advanced Dental Treatment Academics & Research, Jammu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HopeVcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
