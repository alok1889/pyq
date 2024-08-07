import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successful on sign in
    async signIn({ profile }) {
      // 1. connet to DB
      await connectDB();
      // 2. check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not then , then add user to db
      if (!userExists) {
        //Truncate Username too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return truw to allow sign in
      return true;
    },
    // Modifies ther seesion objects
    async session({ session }) {
      // 1. Get user from  DB
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign userid to session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
