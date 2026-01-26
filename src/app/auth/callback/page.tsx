"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/utilities/shared/AuthContext"

type TokenData = {
    access_token: string
    refresh_token: string
}

export default function Callback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setAuthTokens } = useAuth()
    const code = searchParams?.get("code")
    const state = searchParams?.get("state") || "/" // Get the redirect URL from query params
    const redirectUrl = state ? decodeURIComponent(state) : '/'
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

    useEffect(() => {
        if (!code) {
            setStatus("error")
            router.push(redirectUrl) // Redirect to the specified URL or home on error
            return
        }

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code }),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("auth failed")
                }
                return res.json()
            })
            .then((data: TokenData) => {
                const { access_token, refresh_token } = data
                setAuthTokens(access_token, refresh_token)
                setStatus("success")
                router.replace(redirectUrl) // Redirect to the specified URL after successful login
            })
            .catch(() => {
                setStatus("error")
                router.replace(redirectUrl) // Redirect to the specified URL on error
            })
    }, [code, router, setAuthTokens, redirectUrl])

    if (status === "loading") return <p>Signing you in…</p>
    if (status === "success") return <p>Signed in — redirecting…</p>
    if (status === "error") return <p>Sign in failed, redirecting to login…</p>
}
