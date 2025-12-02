import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Heart, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AnalyticsDashboard = () => {
  const [blogStats, setBlogStats] = useState({ total: 0, published: 0, draft: 0 });
  const [commentStats, setCommentStats] = useState({ total: 0, approved: 0, pending: 0 });
  const [eventStats, setEventStats] = useState({ total: 0, totalRegistrations: 0 });
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [categoryPerformance, setCategoryPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch blog stats
      const { data: blogs } = await supabase
        .from('blog_posts')
        .select('status');
      
      if (blogs) {
        setBlogStats({
          total: blogs.length,
          published: blogs.filter(b => b.status === 'published').length,
          draft: blogs.filter(b => b.status === 'draft').length,
        });
      }

      // Fetch comment stats
      const { data: comments } = await supabase
        .from('comments')
        .select('status');
      
      if (comments) {
        setCommentStats({
          total: comments.length,
          approved: comments.filter(c => c.status === 'approved').length,
          pending: comments.filter(c => c.status === 'pending').length,
        });
      }

      // Fetch event stats
      const { data: events } = await supabase
        .from('events')
        .select('registered');
      
      if (events) {
        setEventStats({
          total: events.length,
          totalRegistrations: events.reduce((sum, e) => sum + e.registered, 0),
        });
      }

      // Fetch top posts (most commented)
      const { data: posts } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          category,
          created_at
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(5);

      if (posts) {
        const postsWithComments = await Promise.all(
          posts.map(async (post) => {
            const { data: comments } = await supabase
              .from('comments')
              .select('id')
              .eq('blog_post_id', post.id)
              .eq('status', 'approved');
            
            return {
              title: post.title,
              comments: comments?.length || 0,
            };
          })
        );
        setTopPosts(postsWithComments);
      }

      // Fetch category performance
      const { data: allPosts } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('status', 'published');
      
      if (allPosts) {
        const categoryCounts = allPosts.reduce((acc: any, post) => {
          acc[post.category] = (acc[post.category] || 0) + 1;
          return acc;
        }, {});

        const total = allPosts.length;
        const categoryData = Object.entries(categoryCounts).map(([name, count]: [string, any]) => ({
          name,
          views: count,
          percentage: Math.round((count / total) * 100),
        }));

        setCategoryPerformance(categoryData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }
  const stats = [
    {
      title: "Published Posts",
      value: blogStats.published.toString(),
      subtitle: `${blogStats.draft} drafts`,
      icon: Eye,
    },
    {
      title: "Total Comments",
      value: commentStats.total.toString(),
      subtitle: `${commentStats.pending} pending`,
      icon: MessageSquare,
    },
    {
      title: "Event Registrations",
      value: eventStats.totalRegistrations.toString(),
      subtitle: `${eventStats.total} events`,
      icon: Users,
    },
    {
      title: "Total Content",
      value: (blogStats.total + eventStats.total).toString(),
      subtitle: "Blog posts & events",
      icon: TrendingUp,
    }
  ];


  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Engaged Posts</CardTitle>
          <CardDescription>Posts with highest comment activity</CardDescription>
        </CardHeader>
        <CardContent>
          {topPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No posts available</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post Title</TableHead>
                  <TableHead className="text-right">Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPosts.map((post, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{post.comments}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Views by content category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryPerformance.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No category data available</p>
            ) : (
              categoryPerformance.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">{category.views} posts</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Total Blog Posts</span>
                <Badge>{blogStats.total}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Published</span>
                <Badge variant="outline">{blogStats.published}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Drafts</span>
                <Badge variant="outline">{blogStats.draft}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Approved Comments</span>
                <Badge variant="outline">{commentStats.approved}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Pending Comments</span>
                <Badge variant="outline">{commentStats.pending}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
