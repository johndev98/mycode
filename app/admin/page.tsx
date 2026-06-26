// app/admin/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // <-- ĐÃ THÊM: Import hàm quản lý cookie của Next.js

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Đọc profile để hiển thị tên (Lúc này chắc chắn user đã là admin nhờ layout check chặn trước)
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user?.id)
    .single();

  const handleSignOut = async () => {
    'use server';
    const supabaseClient = await createClient();
    
    // Bước 1: Hủy Session trên hệ thống Supabase (Vô hiệu hóa Token)
    await supabaseClient.auth.signOut();

    // Bước 2: Quét và xóa sạch toàn bộ Cookies đang lưu trên trình duyệt liên quan đến website
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    // ĐÃ SỬA: Thêm kiểu dữ liệu ': any' để TypeScript không báo lỗi parameter implicitly has an 'any' type
    allCookies.forEach((cookie: any) => {
      cookieStore.set({
        name: cookie.name,
        value: '',
        expires: new Date(0), // Đặt ngày hết hạn về năm 1970 để trình duyệt tự xóa ngay lập tức
        path: '/',
      });
    });

    // Bước 3: Đẩy Admin về trang login, lúc này bộ nhớ trình duyệt đã sạch hoàn toàn
    redirect('/admin/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
        <div>
          <h1>Trang Quản Trị (Admin Dashboard)</h1>
          <p>Xin chào, <strong>{profile?.full_name || profile?.email}</strong> ({profile?.role})</p>
        </div>
        <form action={handleSignOut}>
          <button type="submit" style={{ padding: '8px 16px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Đăng xuất
          </button>
        </form>
      </header>

      <main style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <section style={{ flex: 1, padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h2>Quản lý khóa học</h2>
          <p>Tại đây bạn có thể thêm, sửa, xóa các khóa học.</p>
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>+ Thêm khóa học mới</button>
        </section>

        <section style={{ flex: 1, padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h2>Quản lý Users</h2>
          <p>Xem danh sách học viên và các khóa học họ đã mua.</p>
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Xem danh sách học viên</button>
        </section>
      </main>
    </div>
  );
}