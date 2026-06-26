import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          // Cập nhật cookie vào request đầu vào
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set({ name, value, ...options }))
          
          // Khởi tạo lại response để nhận cookie mới
          supabaseResponse = NextResponse.next({ request })
          
          // Ghi đè cookie trả về cho trình duyệt
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Bảo vệ các thư mục con của /admin khỏi người dùng thông thường
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Trường hợp 1: Hoàn toàn chưa đăng nhập -> Chuyển hướng thẳng về trang đăng nhập admin
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Kiểm tra quyền (role) của người dùng
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    
    // Trường hợp 2: Đã đăng nhập nhưng KHÔNG PHẢI ADMIN
    if (!profile || profile.role !== 'admin') {
      // Nếu cố tình vào thẳng đường dẫn gốc '/admin', ép quay về '/admin/login' để đăng nhập đúng tài khoản
      if (request.nextUrl.pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      // Nếu đang đi lạc ở các trang admin con khác, mới đẩy ra trang chủ client /login
      return NextResponse.redirect(new URL('/login', request.url)) 
    }
  }

  // === ĐOẠN XỬ LÝ CHÈN ĐƯỜNG DẪN VÀO HEADER ===
  request.headers.set('x-current-path', request.nextUrl.pathname)

  const finalResponse = NextResponse.next({
    request: { headers: request.headers },
  })

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    finalResponse.cookies.set(cookie.name, cookie.value)
  })

  return finalResponse
}