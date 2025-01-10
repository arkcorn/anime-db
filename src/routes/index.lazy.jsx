import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
    return (
        <div>
            <Link to="/register">Register</Link>
        </div>
    )
}