"use client"
import React, { useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { getGoogleAuthURL } from "@/utils/googleAuth"
import { CommentAuthorImage } from "./CommentAuthorImage";
import { SafeImage } from "./SafeImage";

type Comment = {
    id: string
    author: { id: string; name: string; profile_picture: string }
    text: string
    createdAt: string
}

type Props = {
    articleId: string;
    initialComments?: Comment[];
}

export default function CommentSection({ articleId, initialComments = [] }: Props) {
    const { user, accessToken, loading, refreshAccessToken, logout } = useAuth()
    const [comments, setComments] = useState<Comment[]>(initialComments)
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [text, setText] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!articleId) return;

        const fetchComments = async () => {
            setCommentsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}/comments`);
                const data = await res.json();
                const formattedComments = (data.comments || []).map((backendComment: any) => ({
                    id: backendComment.id,
                    author: {
                        id: backendComment.user_id,
                        name: backendComment.user_name,
                        profile_picture: backendComment.user_profile_picture,
                    },
                    text: backendComment.content,
                    createdAt: backendComment.created_at,
                }));
                setComments(formattedComments);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            } finally {
                setCommentsLoading(false);
            }
        };

        fetchComments();
    }, [articleId]);

    const handleSubmit = async () => {
        if (!text.trim()) return
        setSaving(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ content: text.trim() })
            });
                            const created = await res.json();
                            if (res.ok) {
                                const createdComment: Comment = {
                                    id: created.id,
                                    author: {
                                        id: created.user_id,
                                        name: created.user_name,
                                        profile_picture: created.user_profile_picture,
                                    },
                                    text: created.content,
                                    createdAt: created.created_at,
                                };
                                setComments((s) => [createdComment, ...s])
                                setText("")            } else {
                console.error("Failed to post comment:", created);
            }
        } catch (e) {
            console.error(e)
        } finally {
            setSaving(false)
            refreshAccessToken()
        }
    }

    return (
        <section className="w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>

            {loading ? (
                <div className="text-sm text-gray-500">Checking authentication…</div>
            ) : user ? (
                <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                        <SafeImage src={user.profile_picture ?? "/favicon.ico"} alt={user.name ?? "user"} className="w-10 h-10 rounded-full object-cover" />
                        <textarea
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`Comment as ${user.name ?? "you"}`}
                            className="flex-1 border rounded p-2 resize-y"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded border text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !text.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60 text-sm"
                        >
                            {saving ? "Posting…" : "Post comment"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-6 text-foreground">
                    <a href={getGoogleAuthURL(typeof window !== "undefined" ? window.location.href : "/")} className="inline-flex items-center gap-3 border px-4 py-2 rounded hover:bg-gray-100 hover:text-background">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#4285F4" d="M24 9.5c3.9 0 6.6 1.6 8.1 2.9l6-6C34.6 3 29.9 1 24 1 14.6 1 6.9 6.6 3.2 14.7l7.3 5.7C12.8 14.1 17.9 9.5 24 9.5z" />
                            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v8h12.7c-.6 3.1-2.8 5.7-6 7.3l7.3 5.7C42.9 37.5 46.5 31.9 46.5 24.5z" />
                            <path fill="#FBBC05" d="M10.5 28.4c-.6-1.7-1-3.5-1-5.4s.4-3.7 1-5.4L3.2 12.7C1.1 16.7 0 20.9 0 24.9s1.1 8.2 3.2 12.2l7.3-5.7z" />
                            <path fill="#EA4335" d="M24 46c6.5 0 12-2.1 16-5.8l-7.6-6.1c-2 1.4-4.6 2.3-8.4 2.3-6.1 0-11.2-4.6-12.7-10.8L3.2 35.3C6.9 43.4 14.6 49 24 49z" />
                        </svg>
                        <span className="text-sm">Sign in with Google</span>
                    </a>
                </div>
            )}

            <div className="space-y-4">
                {commentsLoading ? (
                    <div className="text-sm text-gray-500">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="text-sm text-gray-500">No comments yet.</div>
                ) : (
                    comments.map((c) => (
                        <article key={c.id} className="border rounded p-3">
                            <div className="flex items-center gap-3 mb-2">
                                <CommentAuthorImage src={c.author?.profile_picture || ''} alt={c.author?.name || 'Anonymous'} />
                                <div>
                                    <div className="text-sm font-medium">{c.author?.name ?? "Anonymous"}</div>
                                    <div className="text-xs text-gray-500">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</div>
                                </div>
                            </div>
                            <div className="text-sm">{c.text}</div>
                        </article>
                    ))
                )}
            </div>
        </section>
    )
}
