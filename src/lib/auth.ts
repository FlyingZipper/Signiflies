import type { NextAuthOptions } from "next-auth";
import findOrCreateUser from "@/lib/users/createUser";
import findUser from "@/lib/users/findUser";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      try {
        if(!user?.email) throw new Error("No email")
        if(!user?.name) throw new Error("No name")
        await findOrCreateUser({
          email: user?.email,
          name: user?.name,
        })
      } catch (error) {
        return false
      }
      // create a prisma user

      return true;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if(!session.user || !session.user.email) return session

      const userId = (await findUser({
        email: session.user.email,
      }))?.id
      
      return {
        ...session,
        user: {
          ...session.user,
          id: userId,
        }
      }
    }
  },
  providers: [
    GoogleProvider({
        clientId: '1026611402804-q65q0fe68kr241m3qi8p1fpn2eio28lp.apps.googleusercontent.com',
        clientSecret: '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'
    }),
    // CredentialsProvider({
    //   name: "Sign in",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "example@example.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const user = { id: "1", name: "Admin", email: "admin@admin.com" };
    //     return user;
    //   },
    // }),
  ],
};










