import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  author: string;
  content: string;
  blog_post_id: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
}

interface BlogPost {
  id: string;
  title: string;
}

const CommentModeration = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [blogPosts, setBlogPosts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [commentsData, postsData] = await Promise.all([
        supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('blog_posts')
          .select('id, title')
      ]);

      if (commentsData.error) throw commentsData.error;
      if (postsData.error) throw postsData.error;

      setComments((commentsData.data || []).map(comment => ({
        ...comment,
        status: comment.status as "pending" | "approved" | "rejected"
      })));
      
      const postsMap: Record<string, string> = {};
      (postsData.data || []).forEach((post: BlogPost) => {
        postsMap[post.id] = post.title;
      });
      setBlogPosts(postsMap);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Comment approved" });
      fetchData();
    } catch (error: any) {
      console.error('Error approving comment:', error);
      toast({
        title: "Error",
        description: "Failed to approve comment",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Comment rejected" });
      fetchData();
    } catch (error: any) {
      console.error('Error rejecting comment:', error);
      toast({
        title: "Error",
        description: "Failed to reject comment",
        variant: "destructive",
      });
    }
  };

  const pendingCount = comments.filter(c => c.status === "pending").length;

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading comments...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Comment Moderation</span>
          {pendingCount > 0 && (
            <Badge variant="destructive">{pendingCount} pending</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="font-medium">{comment.author}</TableCell>
                <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {blogPosts[comment.blog_post_id] || 'Unknown Post'}
                </TableCell>
                <TableCell>{new Date(comment.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      comment.status === "approved"
                        ? "default"
                        : comment.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {comment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {comment.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApprove(comment.id)}
                          title="Approve"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReject(comment.id)}
                          title="Reject"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CommentModeration;
