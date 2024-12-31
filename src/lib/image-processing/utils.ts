import imageCompression from 'browser-image-compression';

const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/png'
};

export async function compressImage(file: File) {
  try {
    return await imageCompression(file, COMPRESSION_OPTIONS);
  } catch (error) {
    console.error('Image compression failed:', error);
    throw new Error('Failed to compress image');
  }
}

export function createObjectURL(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeObjectURL(url: string) {
  URL.revokeObjectURL(url);
}