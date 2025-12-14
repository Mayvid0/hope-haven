import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TestimonySubmissionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    category: "survivor",
    cancer_type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("testimonies").insert({
        name: formData.name,
        story: formData.story,
        category: formData.category,
        cancer_type: formData.cancer_type,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Thank you! Your story has been submitted for review.");
      setIsOpen(false);
      setFormData({
        name: "",
        story: "",
        category: "survivor",
        cancer_type: "",
      });
    } catch (error: any) {
      console.error("Error submitting testimony:", error);
      toast.error("Failed to submit your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Submit Your Story</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Your Story</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="submit-name">Your Name *</Label>
            <Input
              id="submit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="submit-category">Story Type *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="survivor">Survivor</SelectItem>
                  <SelectItem value="patient">Current Patient</SelectItem>
                  <SelectItem value="family">Family & Caregiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="submit-cancer-type">Cancer Type *</Label>
              <Input
                id="submit-cancer-type"
                value={formData.cancer_type}
                onChange={(e) => setFormData({ ...formData, cancer_type: e.target.value })}
                placeholder="e.g., Breast Cancer"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="submit-story">Your Story *</Label>
            <Textarea
              id="submit-story"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              placeholder="Share your journey, experiences, and message of hope..."
              rows={6}
              required
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Your story will be reviewed by our team before being published.
          </p>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Story"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonySubmissionForm;
