import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ListContext, LoadedContext } from "../contexts";


export const Route = createRootRoute({
    component: () => {
      const listHook = useState([])
      const loadedHook = useState({})
      return (
        <>
          <ListContext.Provider value={listHook}>
            <LoadedContext.Provider value={loadedHook}>
            <div>
              <Outlet />
            </div>
            </LoadedContext.Provider>
          </ListContext.Provider>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      );
    },
  });