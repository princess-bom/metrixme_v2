// Simple icon generation for PWA
// This creates terminal-style icons using HTML5 Canvas

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateIcon(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Black background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);
  
  // Green border
  ctx.strokeStyle = '#00FF00';
  ctx.lineWidth = Math.max(2, size / 32);
  ctx.strokeRect(ctx.lineWidth, ctx.lineWidth, size - 2 * ctx.lineWidth, size - 2 * ctx.lineWidth);
  
  // Matrix M character
  ctx.fillStyle = '#00FF00';
  ctx.font = `bold ${size * 0.6}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', size / 2, size / 2);
  
  // Convert to blob and create download link
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icon-${size}x${size}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Generate all icons
sizes.forEach(size => {
  setTimeout(() => generateIcon(size), 100);
});