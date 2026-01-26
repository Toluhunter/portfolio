// utils/googleAuth.ts
export function getGoogleAuthURL(redirectPageUrl: string = "/") {
    const state = encodeURIComponent(redirectPageUrl)

    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state: state,
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}
