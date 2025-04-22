import { Docs, User } from "@prisma/client";
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

export type theDocs = {
  name: string;
  id: number;
  text: string | null;
  shared: boolean;
  created_at: Date;
  boardid: number;
  ownerid: number;
  shared_access: User[];
};
