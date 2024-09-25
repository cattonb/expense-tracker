import type { z } from "zod";
import { insertExpenseSchema } from "../db/schema/expenses";

export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
