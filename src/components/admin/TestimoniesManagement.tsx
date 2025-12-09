import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ImageUpload } from "./ImageUpload";

interface Testimony {
  id: string;
  name: string;
  story: string;
  category: string;
  cancer_type: string;
  image: string | null;
  status: string;
}

const TestimoniesManagement = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<Testimony | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    category: "survivor",
    cancer_type: "",
    image: ""
  });

  useEffect(() => {
    if (isAdmin) {
      fetchTestimonies();
    }
  }, [isAdmin]);

  const fetchTestimonies = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonies(data || []);
    } catch (error: any) {
      console.error('Error fetching testimonies:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTestimony) {
        const { error } = await supabase
          .from('testimonies')
          .update({
            name: formData.name,
            story: formData.story,
            category: formData.category,
            cancer_type: formData.cancer_type,
            image: formData.image || null,
          })
          .eq('id', editingTestimony.id);

        if (error) throw error;
        toast({ title: "Testimony updated successfully" });
      } else {
        const { error } = await supabase
          .from('testimonies')
          .insert({
            name: formData.name,
            story: formData.story,
            category: formData.category,
            cancer_type: formData.cancer_type,
            image: formData.image || null,
            status: 'approved',
          });

        if (error) throw error;
        toast({ title: "Testimony created successfully" });
      }
      
      setIsDialogOpen(false);
      setEditingTestimony(null);
      setFormData({
        name: "",
        story: "",
        category: "survivor",
        cancer_type: "",
        image: ""
      });
      fetchTestimonies();
    } catch (error: any) {
      console.error('Error saving testimony:', error);
      toast({
        title: "Error",
        description: "Failed to save testimony",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (testimony: Testimony) => {
    setEditingTestimony(testimony);
    setFormData({
      name: testimony.name,
      story: testimony.story,
      category: testimony.category,
      cancer_type: testimony.cancer_type,
      image: testimony.image || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Testimony deleted successfully" });
      fetchTestimonies();
    } catch (error: any) {
      console.error('Error deleting testimony:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimony",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('testimonies')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast({ title: `Testimony ${status === 'approved' ? 'approved' : 'rejected'} successfully` });
      fetchTestimonies();
    } catch (error: any) {
      console.error('Error updating testimony status:', error);
      toast({
        title: "Error",
        description: "Failed to update testimony status",
        variant: "destructive",
      });
    }
  };

  const filteredTestimonies = testimonies.filter(t => t.status === activeTab);

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
          <p className="text-center text-muted-foreground">Loading testimonies...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Testimonies</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTestimony(null);
              setFormData({
                name: "",
                story: "",
                category: "survivor",
                cancer_type: "",
                image: ""
              });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              New Testimony
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTestimony ? "Edit Testimony" : "Create New Testimony"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story">Story *</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="survivor">Survivor</SelectItem>
                      <SelectItem value="family">Family Member</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancer_type">Cancer Type *</Label>
                  <Input
                    id="cancer_type"
                    value={formData.cancer_type}
                    onChange={(e) => setFormData({ ...formData, cancer_type: e.target.value })}
                    placeholder="e.g., Breast Cancer"
                    required
                  />
                </div>
              </div>
              <ImageUpload
                currentImage={formData.image}
                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                folder="testimonies"
                label="Photo"
              />
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimony ? "Update" : "Create"} Testimony
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending ({testimonies.filter(t => t.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({testimonies.filter(t => t.status === 'approved').length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({testimonies.filter(t => t.status === 'rejected').length})
            </TabsTrigger>
          </TabsList>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cancer Type</TableHead>
                <TableHead>Story</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No {activeTab} testimonies
                  </TableCell>
                </TableRow>
              ) : (
                filteredTestimonies.map((testimony) => (
                  <TableRow key={testimony.id}>
                    <TableCell>
                      {testimony.image ? (
                        <img src={testimony.image} alt={testimony.name} className="h-12 w-12 object-cover rounded" />
                      ) : (
                        <div className="h-12 w-12 bg-muted rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{testimony.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {testimony.category.charAt(0).toUpperCase() + testimony.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{testimony.cancer_type}</TableCell>
                    <TableCell className="max-w-xs truncate">{testimony.story}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {activeTab === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-100"
                              onClick={() => handleStatusChange(testimony.id, 'approved')}
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-100"
                              onClick={() => handleStatusChange(testimony.id, 'rejected')}
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(testimony)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(testimony.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestimoniesManagement;
