import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, User } from "lucide-react";
import blogHero from "@/assets/blog-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string | null;
  author: string;
  created_at: string;
}

const categories = ["Survivor Stories", "Medical Insights", "Research Updates", "Prevention Tips"];

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .is('linked_event_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (category?: string) => {
    return blogPosts.filter((post) => {
      const matchesCategory = !category || post.category === category;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const featuredPosts = blogPosts.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading blog posts...</p>
      </div>
    );
  }

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

      <div className="container mx-auto px-4 py-16">
        {/* Featured Posts */}
        {searchQuery === "" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.id} to={`/blogs/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image || blogHero}
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
                        <p className="font-medium text-foreground">{post.author}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tab-based Category Filters */}
        <section>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {filterByCategory().length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">
                    No articles found
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Latest Articles</h2>
                    <p className="text-muted-foreground">
                      {filterByCategory().length} {filterByCategory().length === 1 ? "article" : "articles"}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterByCategory().map((post) => (
                      <Link key={post.id} to={`/blogs/${post.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group animate-fade-in h-full">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.image || blogHero}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className="absolute top-4 left-4">{post.category}</Badge>
                          </div>
                          <CardHeader>
                            <p className="text-sm text-muted-foreground mb-2">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
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
                              <p className="font-medium text-foreground">{post.author}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-6">
                {filterByCategory(category).length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">
                      No {category.toLowerCase()} found
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold">{category}</h2>
                      <p className="text-muted-foreground">
                        {filterByCategory(category).length} {filterByCategory(category).length === 1 ? "article" : "articles"}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filterByCategory(category).map((post) => (
                        <Link key={post.id} to={`/blogs/${post.id}`}>
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group animate-fade-in h-full">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={post.image || blogHero}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <Badge className="absolute top-4 left-4">{post.category}</Badge>
                            </div>
                            <CardHeader>
                              <p className="text-sm text-muted-foreground mb-2">
                                {new Date(post.created_at).toLocaleDateString()}
                              </p>
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
                                <p className="font-medium text-foreground">{post.author}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
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
