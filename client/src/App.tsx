import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import BiographyPage from "@/pages/BiographyPage";
import BaaniPage from "@/pages/BaaniPage";
import BaaniAudioPage from "@/pages/BaaniAudioPage";
import GurdwarasPage from "@/pages/GurdwarasPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jeevni" component={BiographyPage} />
      <Route path="/baani" component={BaaniPage} />
      <Route path="/baani-audio" component={BaaniAudioPage} />
      <Route path="/gurdwara-sahib" component={GurdwarasPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Header />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
