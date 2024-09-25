import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function getTotalSpent() {
  return api.expenses["total-spent"].$get().then((res) => {
    if (!res.ok) {
      throw new Error("Server Error");
    }
    return res.json();
  });
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (isPending) return "Loading...";

  if (error) return "Error: " + error.message;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expense</CardTitle>
        <CardDescription>The total value of all of your expenses</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <p className="text-primary text-3xl font-semibold">{data.total}</p>
      </CardContent>
    </Card>
  );
}
