
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

const authOptions = {
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
          session.user.username = session?.user?.name
            .split(" ")
            .join("")
            .toLocaleLowerCase();
    
          session.user.uid = token.sub;
    
          return session;
        },
      },
      secret: "default_secret_key",
    }


    const handler = NextAuth(authOptions);

    export { handler as GET, handler as POST };