export const login = (user,token) => {
    localStorage.setItem('authToken', token);
    return {
      type: 'LOGIN',
      payload: { user },
    };
};
  
export const logout = () => {
    localStorage.removeItem('authToken');

    return {
      type: 'LOGOUT',
    };
};