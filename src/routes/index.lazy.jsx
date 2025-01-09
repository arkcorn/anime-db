import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-pink-50">
            This is the Homepage <br />
            <Link to="/search">Search</Link> <br />
            <Link to="/list">My List</Link>
        </div>
    )
}