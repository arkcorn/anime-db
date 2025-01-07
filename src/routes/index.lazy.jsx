import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
    return (
        <div>
            This is the Homepage <br />
            <Link to="/search">Search</Link>
        </div>
    )
}