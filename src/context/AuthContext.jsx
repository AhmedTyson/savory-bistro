/** AuthContext.jsx - Global Identity & Session Management **/
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

export const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:3001/api';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('savory_user');
    return saved ? JSON.parse(saved) : null;
  })
  const [allUsers, setAllUsers]       = useState([])
  const [activeToast, setActiveToast] = useState(null)

  // Prefetch users for registration collision checks
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/users`)
        if (!response.ok) throw new Error('API failed')
        const data = await response.json()
        setAllUsers(data.users || [])
      } catch (err) {
        console.error('Failed to load users from backend:', err)
      }
    }
    fetchUsers()
  }, [])

  const login = useCallback((user) => {
    localStorage.setItem('savory_user', JSON.stringify(user))
    setCurrentUser(user)
  }, [])

  const logout = useCallback(() => {
    const name = currentUser?.firstName || ''
    localStorage.removeItem('savory_user')
    setCurrentUser(null)
    setActiveToast({ type: 'logout', firstName: name, id: Date.now() })
  }, [currentUser])

  const showToast = useCallback((toastData) => {
    setActiveToast({ ...toastData, id: Date.now() });
  }, []);

  const clearToast = useCallback(() => {
    setActiveToast(null)
  }, [])

  const updateUser = useCallback((updatedFields) => {
    setCurrentUser(prev => {
      const newUser = { ...prev, ...updatedFields }
      localStorage.setItem('savory_user', JSON.stringify(newUser))
      return newUser
    })
  }, [])

  const registerUser = useCallback(async ({ firstName, lastName, email, password }) => {
    // Fail early if email already registered
    const duplicate = allUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    )
    if (duplicate) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    const payload = {
      id:        allUsers.length + 1,
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.trim().toLowerCase(),
      password:  password
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to create account.' }
      }

      setAllUsers(prev => [...prev, data.user])
      
      // Set session (stripping sensitive password field)
      const safeUser = {
        id:        data.user.id,
        firstName: data.user.firstName,
        lastName:  data.user.lastName,
        email:     data.user.email,
      }
      
      localStorage.setItem('savory_user', JSON.stringify(safeUser))
      setCurrentUser(safeUser)
      return { success: true, user: safeUser }

    } catch (err) {
      console.error('Registration failed:', err)
      return { success: false, error: 'Could not connect to the server.' }
    }
  }, [allUsers]);

  const validateLogin = useCallback((email, password) => {
    const found = allUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
        && u.password === password
    )
    if (!found) return null
    return {
      id:        found.id,
      firstName: found.firstName,
      lastName:  found.lastName,
      email:     found.email,
    }
  }, [allUsers]);

  const value = useMemo(() => ({
    currentUser,
    user: currentUser,
    login,
    logout,
    registerUser,
    validateLogin,
    updateUser,
    activeToast,
    showToast,
    clearToast,
  }), [currentUser, activeToast, login, logout, registerUser, validateLogin, updateUser, showToast, clearToast]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
