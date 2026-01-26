"use client"
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react"
import Cookies from "js-cookie"

type User = {
    id?: string
    name?: string
    profile_picture?: string
}

type AuthContextValue = {
    user: User | null
    accessToken: string | null
    loading: boolean
    setAuthTokens: (accessToken: string, refreshToken: string) => void
    logout: () => void
    refreshAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const accessToken = Cookies.get("accessToken") || null
    const [loading, setLoading] = useState(true)

    const fetchUser = useCallback(async () => {
        const accessToken = Cookies.get("accessToken")
        if (!accessToken) {
            setLoading(false)
            setUser(null)
            return
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/details`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (res.ok) {
                const data = await res.json()
                setUser(data?.user ?? data ?? null)
            } else {
                setUser(null)
            }
        } catch (e) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    const setAuthTokens = useCallback((accessToken: string, refreshToken: string) => {
        Cookies.set("accessToken", accessToken, COOKIE_OPTIONS)
        Cookies.set("refreshToken", refreshToken, {
            ...COOKIE_OPTIONS,
            expires: 7, // Example: refresh token expires in 7 days
        })
        fetchUser()
    }, [fetchUser])

    const logout = useCallback(() => {
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        setUser(null)
    }, [])

    const refreshAccessToken = useCallback(async (): Promise<string | null> => {
        const refreshToken = Cookies.get("refreshToken")
        if (!refreshToken) {
            logout()
            return null
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
                method: "POST",
                body: JSON.stringify({ "refresh_token": refreshToken }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (res.ok) {
                const { access_token, refreshToken: refresh_token } =
                    await res.json()
                setAuthTokens(access_token, refresh_token || refreshToken)
                return access_token
            } else {
                logout()
                return null
            }
        } catch (error) {
            logout()
            return null
        }
    }, [logout, setAuthTokens])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                loading,
                setAuthTokens,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
    return ctx
}

export default AuthContext
