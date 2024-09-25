import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return null;

  if (error) return <p>Not logged in</p>;

  return (
    <>
      <div className="flex gap-2 items-center mb-3">
        <Avatar className="border">
          {data.user.picture && (
            <AvatarImage src={data.user.picture} alt={data.user.given_name || "Profile Picture"} />
          )}
          <AvatarFallback>{data.user.email.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h1>Hello {data.user.given_name}</h1>
      </div>
      <Button asChild>
        <a href="/api/logout">Log out!</a>
      </Button>
    </>
  );
}
