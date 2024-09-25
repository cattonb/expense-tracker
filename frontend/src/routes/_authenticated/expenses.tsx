import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteExpense,
  getExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api";
import { TrashIcon, SymbolIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const query = useQuery(getExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions);

  if (query.error) {
    return query.error.message;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow className="text-muted-foreground">
              <TableCell className="animate-pulse">{loadingCreateExpense?.expense.title}</TableCell>
              <TableCell className="animate-pulse">
                {loadingCreateExpense?.expense.amount}
              </TableCell>
              <TableCell className="animate-pulse">
                {loadingCreateExpense?.expense.date.split("T")[0]}
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          )}
          {query.isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                    </TableRow>
                  );
                })
            : query.data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date.split("T")[0]}</TableCell>
                  <TableCell>
                    <DeleteExpenseButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}

function DeleteExpenseButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteExpense({ id }),
    onError: () => {
      toast("Error", {
        description: "Failed to delete expense, please try again.",
      });
    },
    onSuccess: () => {
      toast("Success", {
        description: "Expense has been successfully deleted",
      });

      queryClient.setQueryData(getExpensesQueryOptions.queryKey, (existingExpenses) => ({
        ...existingExpenses,
        expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
      }));
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      variant="ghost"
      size="icon"
      onClick={() => mutation.mutate()}>
      {mutation.isPending ? (
        <SymbolIcon className="animate-spin" />
      ) : (
        <TrashIcon className="text-destructive" />
      )}
    </Button>
  );
}
