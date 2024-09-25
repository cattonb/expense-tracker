import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Login = () => (
  <div className="space-y-4">
    <h1 className="font-bold text-xl">Choose an option:</h1>
    <div className="flex gap-4">
      <Button asChild>
        <a href="/api/register">Register</a>
      </Button>
      <Button asChild>
        <a href="/api/login">Login</a>
      </Button>
    </div>
  </div>
);

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
