// components/admin-header.tsx
"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/users": "Users",
  "/admin/products": "Products",
  "/admin/settings": "Settings",
};

export function AdminHeaderTitle() {
  const pathname = usePathname();

  const title = titles[pathname] || "Admin Panel";

  return <h1 className="text-lg font-semibold">{title}</h1>;
}