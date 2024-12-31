import React, { useState, useCallback, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { processImage } from '@/lib/image-processing/processor';
import { revokeObjectURL } from '@/lib/image-processing/utils';

export const ImageProcessor = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (originalPreview) revokeObjectURL(originalPreview);
      if (processedImage) revokeObjectURL(processedImage);
    };
  }, []);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      if (originalPreview) revokeObjectURL(originalPreview);
      if (processedImage) revokeObjectURL(processedImage);

      const previewUrl = URL.createObjectURL(file);
      setOriginalImage(file);
      setOriginalPreview(previewUrl);
      setProcessedImage(null);
      
      toast({ 
        title: "Image uploaded", 
        description: "Ready to process" 
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    }
  }, [toast, originalPreview, processedImage]);

  const handleProcess = useCallback(async () => {
    if (!originalImage || isProcessing) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const result = await processImage(originalImage, {
        progress: (p) => setProgress(Math.round(p * 100))
      });
      
      if (processedImage) revokeObjectURL(processedImage);
      setProcessedImage(result.url);
      
      toast({
        title: "Success",
        description: "Background removed successfully"
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing failed",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [originalImage, isProcessing, processedImage, toast]);

  const handleDownload = useCallback(() => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage]);

  return (
    <Card className="w-full max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Original Image Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Original Image</h3>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {originalPreview ? (
              <img 
                src={originalPreview} 
                alt="Original" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                />
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  Drop your image here or click to upload
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4"
                >
                  Choose File
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Processed Image Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Processed Image</h3>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {processedImage ? (
              <img 
                src={processedImage} 
                alt="Processed" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {isProcessing ? (
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-gray-500 mb-2">Processing image...</p>
                    <Progress value={progress} className="w-48 mx-auto" />
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Processed image will appear here
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={handleProcess}
          disabled={!originalImage || isProcessing}
          className="min-w-[200px]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Remove Background'
          )}
        </Button>

        {processedImage && (
          <Button
            onClick={handleDownload}
            className="min-w-[200px]"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Result
          </Button>
        )}
      </div>
    </Card>
  );
};