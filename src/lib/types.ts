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
