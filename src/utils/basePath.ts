export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '.' : '';
}; 