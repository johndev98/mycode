// app/admin/login/page.tsx
'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    setLoading(true)

    // 1. Đăng nhập trực tiếp bằng Email/Password
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setLoading(false)
      return setMsg('Lỗi: Tài khoản hoặc mật khẩu không chính xác!')
    }

    // 2. Kiểm tra Role Admin trong bảng profiles ngay tại giao diện để báo lỗi nếu cần
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user?.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      await supabase.auth.signOut() // Đăng xuất ngay lập tức nếu user thường cố tình mò vào
      setLoading(false)
      return setMsg('Lỗi: Tài khoản này không có quyền truy cập vùng Admin!')
    }

    setMsg('Đăng nhập Admin thành công! Đang chuyển hướng...')
    
    // 3. Sử dụng window.location.href để ép Next.js làm mới context và đẩy thẳng vào hệ thống quản trị
    window.location.href = '/admin'
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>HỆ THỐNG QUẢN TRỊ</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Email Admin</label>
          <input 
            type="email" 
            placeholder="Nhập email admin..." 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Mật khẩu</label>
          <input 
            type="password" 
            placeholder="Nhập mật khẩu..." 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            background: loading ? '#ccc' : '#0070f3', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Đang xử lý...' : 'Đăng nhập vào Hệ thống'}
        </button>
      </form>
      
      {msg && (
        <p style={{ 
          color: msg.startsWith('Lỗi') ? 'red' : 'green', 
          marginTop: '15px', 
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {msg}
        </p>
      )}
    </div>
  )
}