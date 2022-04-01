// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/prefer-default-export
export const getIPFSurl = (url) => {
  const result = url?.replace('ipfs://', '');
  return `https://ipfs.io/ipfs/${result}`;
};
