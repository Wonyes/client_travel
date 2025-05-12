import { useEffect } from "react";
import Global from "./assets/style/Global";
import Router from "./pages/Router";
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLoginStore } from "./stores/useLoginStore";

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
  },
};

const queryClient = new QueryClient({ defaultOptions });

function App() {
  const { decoded } = useLoginStore();

  useEffect(() => {
    if (decoded && decoded.role !== "ROLE_USER") {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      window.location.href = "/";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Global />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
