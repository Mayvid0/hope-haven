import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, User } from "lucide-react";
import blogHero from "@/assets/blog-hero.jpg";
import blogSurvivorStory from "@/assets/blog-survivor-story.jpg";
import blogResearch from "@/assets/blog-research.jpg";
import blogPrevention from "@/assets/blog-prevention.jpg";
import blogMedicalInsights from "@/assets/blog-medical-insights.jpg";
import blogCommunity from "@/assets/blog-community.jpg";
import blogTreatment from "@/assets/blog-treatment.jpg";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: "Survivor Stories" | "Medical Insights" | "Research Updates" | "Prevention Tips";
  image: string;
  author: {
    name: string;
    role: string;
  };
  readTime: number;
  date: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "From Diagnosis to Recovery: Maria's Breast Cancer Journey",
    excerpt: "After her diagnosis, Maria found strength in community support and innovative treatment options. Her inspiring story shows the power of resilience and hope.",
    category: "Survivor Stories",
    image: blogSurvivorStory,
    author: { name: "Dr. Sarah Chen", role: "Oncologist" },
    readTime: 8,
    date: "March 15, 2024",
    featured: true,
  },
  {
    id: 2,
    title: "Breakthrough in Immunotherapy: New Treatment Options",
    excerpt: "Recent advances in immunotherapy are revolutionizing cancer treatment. Learn about the latest research and what it means for patients.",
    category: "Research Updates",
    image: blogResearch,
    author: { name: "Dr. Michael Torres", role: "Research Director" },
    readTime: 12,
    date: "March 10, 2024",
    featured: true,
  },
  {
    id: 3,
    title: "10 Evidence-Based Ways to Reduce Cancer Risk",
    excerpt: "Discover scientifically proven lifestyle changes that can significantly lower your cancer risk. Simple steps for a healthier future.",
    category: "Prevention Tips",
    image: blogPrevention,
    author: { name: "Dr. Jennifer Adams", role: "Preventive Medicine Specialist" },
    readTime: 6,
    date: "March 5, 2024",
    featured: true,
  },
  {
    id: 4,
    title: "Understanding Targeted Therapy: A Patient's Guide",
    excerpt: "Targeted therapy represents a major advancement in cancer treatment. Here's what patients need to know about this personalized approach.",
    category: "Medical Insights",
    image: blogMedicalInsights,
    author: { name: "Dr. Robert Kim", role: "Medical Oncologist" },
    readTime: 10,
    date: "February 28, 2024",
  },
  {
    id: 5,
    title: "Building a Support Network During Cancer Treatment",
    excerpt: "Community support plays a crucial role in cancer recovery. Learn how to build and maintain a strong support system.",
    category: "Survivor Stories",
    image: blogCommunity,
    author: { name: "Lisa Martinez", role: "Patient Advocate" },
    readTime: 7,
    date: "February 20, 2024",
  },
  {
    id: 6,
    title: "Latest Advances in Radiation Therapy Technology",
    excerpt: "Modern radiation therapy is more precise and effective than ever. Explore the cutting-edge technologies improving patient outcomes.",
    category: "Research Updates",
    image: blogTreatment,
    author: { name: "Dr. Amanda Foster", role: "Radiation Oncologist" },
    readTime: 9,
    date: "February 15, 2024",
  },
  {
    id: 7,
    title: "Nutrition During Cancer Treatment: Essential Guidelines",
    excerpt: "Proper nutrition is vital during cancer treatment. Get expert advice on maintaining strength and managing side effects through diet.",
    category: "Prevention Tips",
    image: blogPrevention,
    author: { name: "Emily Chen", role: "Clinical Nutritionist" },
    readTime: 8,
    date: "February 10, 2024",
  },
  {
    id: 8,
    title: "Genetic Testing: Who Should Consider It and Why",
    excerpt: "Understanding your genetic risk for cancer can guide prevention and early detection strategies. Learn if genetic testing is right for you.",
    category: "Medical Insights",
    image: blogMedicalInsights,
    author: { name: "Dr. David Park", role: "Genetic Counselor" },
    readTime: 11,
    date: "February 5, 2024",
  },
];

const categories = ["All", "Survivor Stories", "Medical Insights", "Research Updates", "Prevention Tips"];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blogHero}
            alt="Cancer awareness blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Knowledge & Hope
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Stories, insights, and research to empower your journey
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-background/95 backdrop-blur"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b bg-background sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Posts */}
        {selectedCategory === "All" && searchQuery === "" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{post.category}</Badge>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-foreground">{post.author.name}</p>
                        <p className="text-xs">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No articles found matching your criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group animate-fade-in"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{post.category}</Badge>
                  </div>
                  <CardHeader>
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-foreground">{post.author.name}</p>
                        <p className="text-xs">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest articles, research updates, and survivor stories delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-foreground"
            />
            <Button variant="secondary" size="lg">Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
