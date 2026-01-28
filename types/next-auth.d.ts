import { UserRoleType } from "@/lib/constants";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: UserRoleType;
    committeeCodeUsed: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: UserRoleType;
      committeeCodeUsed: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRoleType;
    committeeCodeUsed: string | null;
  }
}
