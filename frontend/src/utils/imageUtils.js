// Utility function to get the correct image URL
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    // Default to localhost if no env var is set
    const baseUrl = process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL.replace('/api', '')
        : 'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
};

// Alternative function for backward compatibility
export const getProductImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL.replace('/api', '')
        : 'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
}; 