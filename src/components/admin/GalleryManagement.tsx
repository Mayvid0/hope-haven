import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GalleryImage {
  id: string;
  image_url: string;
  tag: string;
  title: string | null;
  created_at: string;
}

export const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("all");
  const [formData, setFormData] = useState({
    image_url: "",
    tag: "",
    title: "",
    newTag: "",
  });
  const [useNewTag, setUseNewTag] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
      
      // Extract unique tags
      const uniqueTags = [...new Set((data || []).map((img) => img.tag))];
      setTags(uniqueTags);
    } catch (error: any) {
      toast.error("Failed to fetch gallery images");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagToUse = useNewTag ? formData.newTag : formData.tag;
    
    if (!formData.image_url || !tagToUse) {
      toast.error("Please upload an image and select/enter a tag");
      return;
    }

    try {
      const { error } = await supabase.from("gallery_images").insert({
        image_url: formData.image_url,
        tag: tagToUse.toLowerCase().trim(),
        title: formData.title || null,
      });

      if (error) throw error;
      
      toast.success("Image added to gallery");
      setIsDialogOpen(false);
      setFormData({ image_url: "", tag: "", title: "", newTag: "" });
      setUseNewTag(false);
      fetchImages();
    } catch (error: any) {
      toast.error("Failed to add image");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Image deleted");
      fetchImages();
    } catch (error: any) {
      toast.error("Failed to delete image");
      console.error(error);
    }
  };

  const filteredImages = filterTag === "all" 
    ? images 
    : images.filter((img) => img.tag === filterTag);

  if (loading) {
    return <div className="text-center py-8">Loading gallery...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Gallery Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload
                currentImage={formData.image_url}
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                folder="gallery"
                label="Gallery Image"
              />
              
              <div className="space-y-2">
                <Label>Title (Optional)</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Image title"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Tag</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setUseNewTag(!useNewTag)}
                    className="text-xs"
                  >
                    {useNewTag ? "Use existing tag" : "Create new tag"}
                  </Button>
                </div>
                
                {useNewTag ? (
                  <Input
                    value={formData.newTag}
                    onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                    placeholder="Enter new tag (e.g., scc)"
                    required={useNewTag}
                  />
                ) : (
                  <Select
                    value={formData.tag}
                    onValueChange={(value) => setFormData({ ...formData, tag: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Image</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter by tag */}
      <div className="flex items-center gap-4">
        <Label>Filter by Tag:</Label>
        <Select value={filterTag} onValueChange={setFilterTag}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filteredImages.length} image(s)
        </span>
      </div>

      {/* Images Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredImages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                No images in gallery
              </TableCell>
            </TableRow>
          ) : (
            filteredImages.map((image) => (
              <TableRow key={image.id}>
                <TableCell>
                  <img
                    src={image.image_url}
                    alt={image.title || "Gallery image"}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{image.title || "-"}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{image.tag}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(image.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
