import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { CreateExpense } from "@server/shared/zod";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryKey: ["current-user"],
  staleTime: Infinity,
  queryFn: async () => {
    return api.me.$get().then((res) => {
      if (!res.ok) {
        throw new Error("Server Error");
      }
      return res.json();
    });
  },
});

export const getExpensesQueryOptions = queryOptions({
  queryKey: ["get-expenses"],
  staleTime: 1000 * 60 * 5,
  queryFn: async () => {
    return api.expenses.$get().then((res) => {
      if (!res.ok) {
        throw new Error("Server Error");
      }
      return res.json();
    });
  },
});

export const createExpense = async ({ value }: { value: CreateExpense }) => {
  return api.expenses.$post({ json: value }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Server Error");
    }

    return res.json();
  });
};

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  staleTime: 1000 * 60 * 5,
  queryFn: async () => {
    return {};
  },
});

export const deleteExpense = async ({ id }: { id: number }) => {
  return api.expenses[":id{[0-9]+}"].$delete({ param: { id: id.toString() } }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Server Error");
    }

    await new Promise((r) => setTimeout(r, 3000));

    return res.json();
  });
};
