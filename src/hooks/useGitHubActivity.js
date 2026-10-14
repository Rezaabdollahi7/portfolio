import { useEffect, useState } from "react";
import { cachedGitHubActivity, fetchGitHubActivity } from "../lib/github";

// { status: "loading" | "ready" | "error", data }. Cached data shows at once
// and is refreshed in the background.
export const useGitHubActivity = () => {
  const [state, setState] = useState(() => {
    const data = cachedGitHubActivity();
    return { status: data ? "ready" : "loading", data };
  });

  useEffect(() => {
    const controller = new AbortController();
    fetchGitHubActivity(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState((s) => (s.data ? s : { status: "error", data: null }));
      });
    return () => controller.abort();
  }, []);

  return state;
};
