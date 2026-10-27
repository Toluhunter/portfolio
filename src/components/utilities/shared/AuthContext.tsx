"use client"
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useSyncExternalStore,
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

const subscribeToNothing = () => () => {}

// The signed-in user for a token, or null when the request fails.
async function requestUser(accessToken: string): Promise<User | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/details`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        if (!res.ok) return null
        const data = await res.json()
        return data?.user ?? data ?? null
    } catch {
        return null
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const accessToken = Cookies.get("accessToken") || null
    const [loadingUser, setLoading] = useState(true)
    // Without a token there is no user to load. The server cannot read the cookie and renders loading,
    // as it always has; the client then knows straight away.
    const hasToken = useSyncExternalStore(subscribeToNothing, () => Boolean(Cookies.get("accessToken")), () => true)
    const loading = hasToken && loadingUser

    const fetchUser = useCallback(async () => {
        const accessToken = Cookies.get("accessToken")
        if (!accessToken) {
            setLoading(false)
            setUser(null)
            return
        }
        setUser(await requestUser(accessToken))
        setLoading(false)
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
        } catch {
            logout()
            return null
        }
    }, [logout, setAuthTokens])

    // With no token there is nothing to load: user starts null and loading is false.
    useEffect(() => {
        const accessToken = Cookies.get("accessToken")
        if (!accessToken) return
        requestUser(accessToken).then((loaded) => {
            setUser(loaded)
            setLoading(false)
        })
    }, [])

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
