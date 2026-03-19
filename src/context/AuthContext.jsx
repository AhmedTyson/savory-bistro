import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:3001/api';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('savory_user');
    return saved ? JSON.parse(saved) : null;
  })
  const [allUsers, setAllUsers]       = useState([])
  const [pendingToast, setPendingToast] = useState(null)

  // On mount, load users from our Backend API
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

  function login(user) {
    localStorage.setItem('savory_user', JSON.stringify(user))
    setCurrentUser(user)
  }

  function logout() {
    const name = currentUser?.firstName || ''
    localStorage.removeItem('savory_user')
    setCurrentUser(null)
    setPendingToast({ type: 'logout', firstName: name })
  }

  function clearPendingToast() {
    setPendingToast(null)
  }

  function updateUser(updatedFields) {
    const newUser = { ...currentUser, ...updatedFields }
    localStorage.setItem('savory_user', JSON.stringify(newUser))
    setCurrentUser(newUser)
  }

  // Register is now async!
  async function registerUser({ firstName, lastName, email, password }) {
    // 1. Initial frontend duplicate check
    const duplicate = allUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    )
    if (duplicate) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    // 2. Build the secure payload
    const payload = {
      id:        allUsers.length + 1,
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.trim().toLowerCase(),
      password:  password
    }

    try {
      // 3. Post to Node Backend
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to create account.' }
      }

      // 4. Update the local list and log the user in safely (no password returning)
      setAllUsers(prev => [...prev, data.user])
      
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
  }

  function validateLogin(email, password) {
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
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      user: currentUser, // Alias for requested logic
      login,
      logout,
      registerUser,
      validateLogin,
      updateUser,
      pendingToast,
      clearPendingToast,
    }}>
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
