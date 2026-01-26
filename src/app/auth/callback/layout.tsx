import { AuthProvider } from "@/components/utilities/shared/AuthContext";

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}