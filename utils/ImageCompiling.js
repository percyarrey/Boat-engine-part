async function ImageCompiling(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 960;
          const maxHeight = 720;
          let width = img.width;
          let height = img.height;
  
          // Calculate aspect ratio
          const aspectRatio = width / height;
  
          // Check if image exceeds the maximum dimensions
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              width = maxWidth;
              height = Math.round(width / aspectRatio);
            } else {
              height = maxHeight;
              width = Math.round(height * aspectRatio);
            }
          }
  
          // Create a canvas element
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Set the canvas dimensions
          canvas.width = width;
          canvas.height = height;
  
          // Draw the resized image onto the canvas
          ctx.drawImage(img, 0, 0, width, height);
          // Get the resized image as a data URL
          const resizedImageDataUrl = canvas.toDataURL(file.type);
          resolve(resizedImageDataUrl);
        };
  
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    });
  }
  
  export default ImageCompiling;