import { wrap } from "svelte-spa-router/wrap";
import Home from "../pages/Home.svelte";

const routes = new Map();

routes.set("/", Home);
routes.set(
  "/counter",
  wrap({
    asyncComponent: () => import("@/pages/Counter.svelte"),
  })
);
routes.set(
  "/profile",
  wrap({
    asyncComponent: () => import("@/pages/Profile.svelte"),
  })
);

routes.set(
  "/todo",
  wrap({
    asyncComponent: () => import("@/modules/todo/TodoPage.svelte"),
  })
);

routes.set(
  "/card",
  wrap({
    asyncComponent: () => import("@/pages/Card.svelte"),
  })
);

export default routes;
