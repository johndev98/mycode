'use client'
import { createClient } from '@/utils/supabase/client'

export default function UserLoginPage() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/courses`,
      },
    })
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>USER LOGIN</h1>
      <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Đăng nhập bằng Google
      </button>
    </div>
  )
}