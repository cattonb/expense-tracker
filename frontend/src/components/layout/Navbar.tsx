import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../ui/button";

export default function Navbar() {
  return (
    <div className="p-2 container max-w-3xl m-auto flex justify-between items-baseline">
      <Link to="/" className="text-xl font-bold">
        Expense Tracker
      </Link>
      <div className="flex gap-2 ">
        <Link to="/about" className={buttonVariants({ variant: "link" })}>
          About
        </Link>
        <Link to="/expenses" className={buttonVariants({ variant: "link" })}>
          All Expenses
        </Link>
        <Link to="/create-expense" className={buttonVariants({ variant: "link" })}>
          Create Expense
        </Link>
        <Link to="/profile" className={buttonVariants({ variant: "link" })}>
          Profile
        </Link>
      </div>
    </div>
  );
}
