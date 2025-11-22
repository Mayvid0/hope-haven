import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  content: string;
  postTitle: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const CommentModeration = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "John Doe",
      content: "This is such an inspiring story! Thank you for sharing.",
      postTitle: "Sarah's Journey Through Recovery",
      date: "2024-03-16",
      status: "pending"
    },
    {
      id: "2",
      author: "Mary Smith",
      content: "Very informative article about early detection.",
      postTitle: "Understanding Early Detection",
      date: "2024-03-15",
      status: "approved"
    },
    {
      id: "3",
      author: "Bob Johnson",
      content: "Thanks for raising awareness about this important topic.",
      postTitle: "Latest Research Updates",
      date: "2024-03-14",
      status: "pending"
    }
  ]);

  const handleApprove = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: "approved" as const } : c));
    toast({ title: "Comment approved" });
  };

  const handleReject = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: "rejected" as const } : c));
    toast({ title: "Comment rejected" });
  };

  const pendingCount = comments.filter(c => c.status === "pending").length;

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
                <TableCell className="text-sm text-muted-foreground">{comment.postTitle}</TableCell>
                <TableCell>{comment.date}</TableCell>
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
