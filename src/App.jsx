import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./providers/AuthProvider";

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const { state } = useSidebar();

  // Sidebar widths
  const expandedWidth = "13rem";
  const collapsedWidth = "73px";
  const sidebarWidth = state === "collapsed" ? collapsedWidth : expandedWidth;

  return (
    <div className="flex h-screen w-full">
      {!isAuthPage && <AppSidebar variant="inset" />}
      <SidebarInset>
        <div className="relative flex flex-1 flex-col h-screen min-w-0">
          {!isAuthPage && (
            <div
              className="fixed top-0 right-0 z-30 transition-all duration-200 bg-white"
              style={{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }}
            >
              <SiteHeader />
            </div>
          )}
          <div
            className={`@container/main flex flex-1 flex-col gap-2 overflow-y-auto min-w-0 transition-all duration-200 scrollbar-hide ${
              isAuthPage ? "pt-0" : "pt-12"
            }`}
          >
            <AppRoutes />
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarProvider defaultOpen={false}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </AuthProvider>
      </SidebarProvider>
    </Router>
  );
}

export default App;
