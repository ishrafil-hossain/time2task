import {  SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <SidebarProvider defaultOpen={false}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<DashboardLayout />} />
          </Routes>
        </AuthProvider>
      </SidebarProvider>
    </Router>
  );
}

export default App;
