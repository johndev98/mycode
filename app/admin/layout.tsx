import { AdminHeaderTitle } from "@/components/admin-header";
import { AdminSidebar } from "@/components/admin-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// app/admin/layout.tsx

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path") || ""; 
  const isLoginPage = currentPath.endsWith("/admin/login");

  // 1. Nếu là trang login -> Trả về kết quả luôn và THOÁT HÀM hoàn toàn
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 2. Kiểm tra quyền nghiêm ngặt cho các trang khác
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/admin/login"); // Thêm return
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return redirect("/login"); // Thêm return
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
          <AdminHeaderTitle />
        </header>
        <main className="p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}