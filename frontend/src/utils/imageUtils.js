// Utility function to get the correct image URL
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    // For uploads, we need to use the base URL without /api
    // because uploads are served directly from /uploads, not /api/uploads
    const baseUrl = process.env.REACT_APP_API_URL || '';
    const uploadsBaseUrl = baseUrl.replace('/api', '');
    return `${uploadsBaseUrl}${imagePath}`;
};

// Alternative function for backward compatibility
export const getProductImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    const baseUrl = process.env.REACT_APP_API_URL || '';
    const uploadsBaseUrl = baseUrl.replace('/api', '');
    return `${uploadsBaseUrl}${imagePath}`;
}; 