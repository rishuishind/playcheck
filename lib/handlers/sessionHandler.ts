export const setSessionStorageWithExpiry = async (
  key: string,
  value: any,
  expiryMinutes: number
) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryMinutes * 60 * 1000, // Expiry time in milliseconds
  };
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSessionStorageWithExpiry = async (key: string) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    // Data has expired
    sessionStorage.removeItem(key);
    return null;
  }

  return item.value;
};
