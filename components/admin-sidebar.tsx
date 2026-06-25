"use client";

import {
    LayoutDashboard,
    Users,
    Package,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: Users,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: Package,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const { state } = useSidebar();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div
                    className={`
      overflow-hidden whitespace-nowrap px-2 py-2 font-bold
      transition-all duration-200
      ${state === "collapsed" ? "w-0 opacity-0" : "w-auto opacity-100"}
    `}
                >
                    Admin Panel
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="px-2 py-2 text-sm text-muted-foreground">
                    Admin v1.0
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}