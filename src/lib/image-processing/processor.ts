import { removeBackground } from '@imgly/background-removal';
import { ProcessingOptions, ProcessedResult } from './types';
import { compressImage, createObjectURL } from './utils';

export async function processImage(
  file: File, 
  options: ProcessingOptions = {}
): Promise<ProcessedResult> {
  try {
    // Compress image before processing
    const compressedFile = await compressImage(file);

    // Process the image
    const result = await removeBackground(compressedFile, {
      progress: options.progress,
    });

    // Create result blob
    const resultBlob = new Blob([result], { type: 'image/png' });
    const url = createObjectURL(resultBlob);

    return { url, blob: resultBlob };
  } catch (error) {
    console.error('Image processing failed:', error);
    throw new Error('Failed to process image');
  }
}