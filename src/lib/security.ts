/**
 * Togh Aman Committee - Frontend Security Utilities
 * Enforces client-side privacy protection, EXIF metadata stripping, and input sanitization.
 * Reference: Section 4.1 & Chapter 11 of the Architecture Plan.
 */

/**
 * Strips EXIF metadata (GPS location, phone camera model, timestamps)
 * by drawing the image onto an unattached HTML5 Canvas and re-encoding.
 */
export async function stripExifFromImage(file: File, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Draw image onto clean canvas - completely drops all EXIF metadata
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Image blob serialization failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image for sanitization'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Basic XSS sanitization for user inputs before submission
 */
export function sanitizeInput(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

/**
 * Generates an authentic tracking code matching the constitutional format
 */
export function generateClientTrackingCode(prefix: string): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `TAC-${prefix.toUpperCase().slice(0, 3)}-${randomDigits}`;
}
