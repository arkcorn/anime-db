import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ListContext } from "../contexts";

export const Route = createRootRoute({
    component: () => {
      const listHook = useState([])
      return (
        <>
          <ListContext.Provider value={listHook}>
            <div>
              <Outlet />
            </div>
          </ListContext.Provider>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      );
    },
  });