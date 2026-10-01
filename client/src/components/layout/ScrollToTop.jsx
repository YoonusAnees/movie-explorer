import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the window scroll position to the top on every route change.
 *
 * - Uses instant scroll (behavior: "auto") so the new page
 *   always starts at the top without a jarring smooth animation.
 * - Renders nothing — purely a side-effect component.
 * - Place this once inside the router (e.g. inside AppLayout or
 *   at the root of AppRoutes).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
