// Utility function to get the correct image URL
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    // Use environment variable for API URL or fallback to relative path
    const baseUrl = process.env.REACT_APP_API_URL || '';
    return `${baseUrl}${imagePath}`;
};

// Alternative function for backward compatibility
export const getProductImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    const baseUrl = process.env.REACT_APP_API_URL || '';
    return `${baseUrl}${imagePath}`;
}; 