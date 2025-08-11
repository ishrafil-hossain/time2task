import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavUser({
  items,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [openMenu, setOpenMenu] = useState(null);

  // Initialize open menu based on active items
  useEffect(() => {
    const activeMenuIndex = items.findIndex(item => {
      const hasActiveSubItem = item.items?.some(subItem => pathname === subItem.url);
      return hasActiveSubItem || item.isActive;
    });
    
    if (activeMenuIndex !== -1) {
      setOpenMenu(activeMenuIndex);
    }
  }, [pathname, items]);

  const handleMenuToggle = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          // Check if any submenu item is active
          const hasActiveSubItem = item.items?.some(subItem => pathname === subItem.url);
          const isMainItemActive = hasActiveSubItem || item.isActive;
          const isOpen = openMenu === index;
          
          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={() => handleMenuToggle(index)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={isMainItemActive}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubItemActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isSubItemActive}>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
