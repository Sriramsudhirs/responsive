export interface ProcessingOptions {
  progress?: (progress: number) => void;
  quality?: number;
  maxSize?: number;
}

export interface ProcessedResult {
  url: string;
  blob: Blob;
}