export const getMinLengthMessage = (field: string, val: number) => {
  return `${field} must be at least ${val} characters long`;
};

export const getMaxLengthMessage = (field: string, val: number) => {
  return `${field} must be ${val} characters or less`;
};

export const getValidUrlMessage = (field: string) => {
  return `${field} must be a valid URL`;
};

export const getAtLeastMessage = (field: string, val: number, type: string) => {
  return `${field} must contain at least ${val} ${type}`;
};

export const getMinValueMessage = (field: string, val: number) => {
  return `${field} must be at least ${val}`;
};

export const getMaxValueMessage = (field: string, val: number) => {
  return `${field} must be ${val} or less`;
};