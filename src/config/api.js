// API Configuration for Rider App
export const API_CONFIG = {
  // LocationIQ API for routing and geocoding
  LOCATIONIQ: {
    API_KEY: process.env.REACT_APP_LOCATIONIQ_API_KEY || 'pk.e62ffd62f56c72b6eb9c10981bb3ba3',
    BASE_URL: process.env.REACT_APP_LOCATIONIQ_BASE_URL || 'https://us1.locationiq.com/v1',
    ENDPOINTS: {
      DIRECTIONS: '/directions/driving',
      REVERSE_GEOCODING: '/reverse.php',
      FORWARD_GEOCODING: '/search.php'
    }
  },
  // Google Maps API config
  GOOGLE_MAPS: {
    API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AlzaSyALHOOwuR3UnGd-3LH-hhCbD2r',
    TILE_LAYER: process.env.REACT_APP_GOOGLE_MAPS_TILE_LAYER || `https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AlzaSyALHOOwuR3UnGd-3LH-hhCbD2r'}`,
    ATTRIBUTION: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
  },
  // Map configuration
  MAP: {
    DEFAULT_CENTER: [
      parseFloat(process.env.REACT_APP_MAP_DEFAULT_CENTER_LATITUDE || '13.0827'), 
      parseFloat(process.env.REACT_APP_MAP_DEFAULT_CENTER_LONGITUDE || '80.2707')
    ], // Chennai center
    DEFAULT_ZOOM: parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM || '12'),
    // To use Google Maps, set TILE_LAYER to API_CONFIG.GOOGLE_MAPS.TILE_LAYER
    TILE_LAYER: process.env.REACT_APP_MAP_TILE_LAYER || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  // Request timeouts
  TIMEOUTS: {
    ROUTE_REQUEST: parseInt(process.env.REACT_APP_ROUTE_REQUEST_TIMEOUT || '10000'), // 10 seconds
    GEOCODING_REQUEST: parseInt(process.env.REACT_APP_GEOCODING_REQUEST_TIMEOUT || '5000') // 5 seconds
  }
};

// Helper function to build LocationIQ URLs
export const buildLocationIQUrl = (endpoint, params = {}) => {
  const baseUrl = API_CONFIG.LOCATIONIQ.BASE_URL;
  const apiKey = API_CONFIG.LOCATIONIQ.API_KEY;
  
  const queryParams = new URLSearchParams({
    key: apiKey,
    ...params
  });
  
  return `${baseUrl}${endpoint}?${queryParams.toString()}`;
};

// Helper function to validate API key
export const validateAPIKey = async () => {
  try {
    const testUrl = buildLocationIQUrl('/directions/driving/77.6245,12.9352;77.6387,12.9141', {
      overview: 'full',
      geometries: 'geojson'
    });
    
    const response = await fetch(testUrl);
    return response.ok;
  } catch (error) {
    console.error('API Key validation failed:', error);
    return false;
  }
};

export default API_CONFIG; 