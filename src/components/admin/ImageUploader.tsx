import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  bucket?: string;
  folder?: string;
  maxSizeMB?: number;
  maxWidth?: number;
  quality?: number;
  className?: string;
  accept?: string;
}

const compressImage = (file: File, maxWidth: number, quality: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = Math.round((h * maxWidth) / w);
        w = maxWidth;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
        "image/webp",
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};

export function ImageUploader({
  onUpload,
  bucket = "property-images",
  folder = "uploads",
  maxSizeMB = 2,
  maxWidth = 1920,
  quality = 0.8,
  className = "",
  accept = "image/*",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = useCallback(
    async (file: File) => {
      const maxBytes = maxSizeMB * 1024 * 1024;

      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
        return;
      }

      if (file.size > maxBytes * 2) {
        toast({ title: "File too large", description: `Max file size is ${maxSizeMB * 2}MB before compression.`, variant: "destructive" });
        return;
      }

      setUploading(true);
      setProgress(10);

      try {
        // Compress
        setProgress(20);
        const compressed = await compressImage(file, maxWidth, quality);
        setProgress(50);

        if (compressed.size > maxBytes) {
          toast({ title: "Still too large", description: `Image is ${(compressed.size / 1024 / 1024).toFixed(1)}MB after compression. Max is ${maxSizeMB}MB.`, variant: "destructive" });
          setUploading(false);
          setProgress(0);
          return;
        }

        // Upload
        const ext = "webp";
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        setProgress(60);

        const { error } = await supabase.storage.from(bucket).upload(path, compressed, {
          contentType: "image/webp",
          upsert: false,
        });

        if (error) throw error;
        setProgress(90);

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
        setProgress(100);

        onUpload(urlData.publicUrl);
        toast({ title: "Uploaded!", description: "Image uploaded successfully." });
      } catch (err: any) {
        toast({ title: "Upload failed", description: err.message, variant: "destructive" });
      } finally {
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 500);
      }
    },
    [bucket, folder, maxSizeMB, maxWidth, quality, onUpload, toast]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      Array.from(files).forEach(uploadFile);
    },
    [uploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className={className}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
            <Progress value={progress} className="max-w-xs mx-auto" />
            <p className="text-sm text-muted-foreground">Compressing & uploading...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-sm font-medium text-foreground">
              Drag & drop images here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Max {maxSizeMB}MB per image • Auto-compressed to WebP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
