import { Docs } from "@prisma/client";
export type Board = {
  name: string;
  id: number;
  description: string | null;
  shared: boolean;
  ownerid: number;
  created_at: Date;
  docs: Docs[];
};

export type theUser = {
  id: number;
  name: string;
  created_at: Date;
  email: string;
  authType: string;
  lastLogin: Date | null;
  sidebarOpen: string[];
  boards: Board[];
};
