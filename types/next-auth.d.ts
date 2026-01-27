import { UserRoleType } from "@/lib/constants";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: UserRoleType;
    committeeApproved: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: UserRoleType;
      committeeApproved: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRoleType;
    committeeApproved: boolean;
  }
}
