import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { jwtDecode } from 'jwt-decode';

// Extend the built-in session types
declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            avatar?: string | null;
            accessToken?: string;
        };
    }

    interface User {
        id: string;
        email?: string;
        name?: string;
        avatar?: string;
        accessToken?: string;
    }
}

// Extend JWT type
declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        accessToken?: string;
        avatar?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'jsmith@example.com'
                },
                password: { label: 'Password', type: 'password' },
                token: { label: 'Token', type: 'text' } // For social login token
            },
            async authorize(credentials) {
                try {
                    // If we have a token from social login
                    if (credentials?.token) {
                        try {
                            // Decode the JWT to get user info
                            const decoded = jwtDecode<{
                                user: {
                                    sub: string;
                                    email: string;
                                    avatar?: string;
                                };
                            }>(credentials.token);
                            return {
                                id: decoded.user?.sub,
                                email: decoded.user?.email,
                                avatar: decoded.user?.avatar,
                                accessToken: credentials.token
                            };
                        } catch (error) {
                            console.error('Error decoding token:', error);
                            return null;
                        }
                    }

                    // Regular email/password login
                    if (credentials?.email && credentials?.password) {
                        const res = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
                            {
                                method: 'POST',
                                body: JSON.stringify({
                                    email: credentials.email,
                                    password: credentials.password
                                }),
                                headers: { 'Content-Type': 'application/json' }
                            }
                        );

                        if (!res.ok) {
                            return null;
                        }

                        const data = await res.json();
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            avatar: data.user.avatar,
                            accessToken: data.accessToken
                        };
                    }

                    return null;
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 // 1 hour
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.accessToken = token.accessToken;
                session.user.avatar = token.avatar;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
