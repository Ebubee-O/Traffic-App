export const login = async (email, password) => {
  const response = await fetch('https://tradingwithkings.pythonanywhere.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    return data;
  }
  throw new Error(data.error);
};

export const signup = async (email, password) => {
  const response = await fetch('https://tradingwithkings.pythonanywhere.com/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.error);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};
