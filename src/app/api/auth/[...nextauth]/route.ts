export const dynamic = "force-dynamic"; // defaults to auto

import { config } from "@/app/auth";
import NextAuth from "next-auth";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
