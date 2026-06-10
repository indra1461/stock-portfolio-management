export const setAuthData = (token: string, user: unknown) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export const clearAuthData = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getAuthData = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return { token, user: user ? JSON.parse(user) : null };
}