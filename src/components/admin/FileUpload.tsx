import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FileUploadProps {
  currentFile?: string | null;
  onFileUploaded: (url: string, fileType: string) => void;
  folder: string;
  label?: string;
  accept?: string;
}

export const FileUpload = ({ 
  currentFile, 
  onFileUploaded, 
  folder, 
  label = "File",
  accept = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const getFileType = (file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type;
    
    if (mimeType.includes('pdf') || extension === 'pdf') return 'PDF';
    if (mimeType.includes('word') || ['doc', 'docx'].includes(extension)) return 'Word';
    if (mimeType.includes('powerpoint') || ['ppt', 'pptx'].includes(extension)) return 'PowerPoint';
    if (mimeType.includes('excel') || ['xls', 'xlsx'].includes(extension)) return 'Excel';
    if (mimeType.includes('video') || ['mp4', 'mov', 'avi'].includes(extension)) return 'Video';
    return extension.toUpperCase() || 'File';
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 50MB for documents)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size should be less than 50MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const uniqueName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(uniqueName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(uniqueName);

      const fileType = getFileType(file);
      setFileName(file.name);
      onFileUploaded(publicUrl, fileType);
      toast.success('File uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    onFileUploaded('', '');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {currentFile || fileName ? (
        <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/50">
          <FileText className="h-8 w-8 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{fileName || 'Uploaded file'}</p>
            <p className="text-xs text-muted-foreground truncate">{currentFile}</p>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={uploading}
            className="cursor-pointer"
          />
          {uploading && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
