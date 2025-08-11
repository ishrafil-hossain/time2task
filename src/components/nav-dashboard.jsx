import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom"; 

export function NavDashboard({ items }) {
  const location = useLocation();
  const pathname = location.pathname; 

  if (!items.length) return null;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = pathname === item.url || item.isActive; 
          return (
            <Link key={item.name} to={item.url}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.name} isActive={isActive}>
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </Link>
          );
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
