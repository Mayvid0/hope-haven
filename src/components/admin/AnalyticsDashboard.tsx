import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Heart, TrendingUp } from "lucide-react";

const AnalyticsDashboard = () => {
  const stats = [
    {
      title: "Total Views",
      value: "12,543",
      change: "+12.5%",
      icon: Eye,
      trend: "up"
    },
    {
      title: "Total Comments",
      value: "1,234",
      change: "+8.2%",
      icon: MessageSquare,
      trend: "up"
    },
    {
      title: "Engagement Rate",
      value: "23.4%",
      change: "+3.1%",
      icon: Heart,
      trend: "up"
    },
    {
      title: "New Readers",
      value: "3,456",
      change: "+15.7%",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  const topPosts = [
    {
      title: "Sarah's Journey Through Recovery",
      views: 2543,
      comments: 89,
      engagement: "28.5%"
    },
    {
      title: "Understanding Early Detection",
      views: 2134,
      comments: 67,
      engagement: "24.2%"
    },
    {
      title: "Latest Research Updates",
      views: 1876,
      comments: 54,
      engagement: "21.8%"
    },
    {
      title: "Prevention Tips for Everyone",
      views: 1654,
      comments: 45,
      engagement: "19.3%"
    },
    {
      title: "Community Support Stories",
      views: 1432,
      comments: 38,
      engagement: "17.6%"
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
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Most viewed and engaged posts this month</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post Title</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Comments</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPosts.map((post, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{post.comments}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{post.engagement}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Views by content category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Survivor Stories", views: 4523, percentage: 36 },
              { name: "Medical Insights", views: 3821, percentage: 30 },
              { name: "Research Updates", views: 2134, percentage: 17 },
              { name: "Prevention Tips", views: 1432, percentage: 11 },
              { name: "Community Events", views: 633, percentage: 6 }
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.views.toLocaleString()} views</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { user: "John Doe", action: "commented on", post: "Sarah's Journey", time: "2 min ago" },
              { user: "Mary Smith", action: "liked", post: "Early Detection Guide", time: "15 min ago" },
              { user: "Bob Johnson", action: "shared", post: "Research Updates", time: "1 hour ago" },
              { user: "Alice Brown", action: "commented on", post: "Prevention Tips", time: "2 hours ago" },
              { user: "Tom Wilson", action: "liked", post: "Community Support", time: "3 hours ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">{activity.user.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="text-muted-foreground truncate">{activity.post}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
