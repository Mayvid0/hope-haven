import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import blogHero from "@/assets/blog-hero.jpg";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string | null;
  images: string[] | null;
  author: string;
  content: string;
  created_at: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  created_at: string;
  status: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPost(data);

      // Fetch related posts (excluding event recaps)
      if (data) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', data.category)
          .eq('status', 'published')
          .is('linked_event_id', null)
          .neq('id', id)
          .limit(3);
        
        setRelatedPosts(related || []);
      }
    } catch (error: any) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_post_id', id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            blog_post_id: id,
            author: commentAuthor.trim(),
            content: commentContent.trim(),
            status: 'pending'
          }
        ]);

      if (error) throw error;
      
      toast.success("Comment submitted for moderation");
      setCommentAuthor("");
      setCommentContent("");
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/blogs")}>
              Back to Blogs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allImages = [
    ...(post.image ? [post.image] : []),
    ...(post.images || []),
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/blogs")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Button>

        {/* Article Header */}
        <article>
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
          </div>

          {/* Hero Image */}
          {allImages.length > 0 && (
            <div className="relative h-[500px] overflow-hidden rounded-lg mb-8">
              <img
                src={allImages[0]}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Additional Images Gallery */}
          {allImages.length > 1 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Gallery</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allImages.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Buttons */}
          <div className="flex items-center gap-4 mb-12 pb-12 border-b">
            <span className="font-semibold">Share this article:</span>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" asChild>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a href={`mailto:?subject=${post.title}&body=Check out this article: ${shareUrl}`}>
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Author Info */}
          <Card className="bg-muted/50 mb-12">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div>
                <p className="font-semibold text-lg">{post.author}</p>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Comments ({comments.length})
            </h3>

            {/* Existing Comments */}
            {comments.length > 0 && (
              <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-2 mb-2">
                        <p className="font-semibold">{comment.author}</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <Card>
              <CardHeader>
                <h4 className="text-lg font-semibold">Leave a Comment</h4>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your comment..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit">Submit Comment</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blogs/${relatedPost.id}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedPost.image || blogHero}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4">{relatedPost.category}</Badge>
                      </div>
                      <CardHeader>
                        <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                      </CardContent>
                      <CardFooter className="text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(relatedPost.created_at).toLocaleDateString()}
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
