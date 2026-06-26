import courses from "@/data/courses.json";
import { CourseCardClient } from "@/components/course-card-client";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
  // 1. Khởi tạo Supabase Server Client để check trạng thái login
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Filter các khóa học từ file JSON của bạn
  const publicCourses = courses.filter(
    (course) => course.status === "published"
  );

  // 2. Định nghĩa hàm Logout (Server Action) chạy trực tiếp khi bấm nút
  const handleSignOut = async () => {
    "use server";
    const supabaseClient = await createClient();
    await supabaseClient.auth.signOut();
    redirect("/courses"); // Hoặc trang bất kỳ bạn muốn sau khi logout
  };

  return (
    <div className="space-y-6 p-4">
      {/* Thanh công cụ chứa nút điều hướng Login / Logout */}
      <div className="flex justify-end items-center border-b pb-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Xin chào, {user.email}</span>
            <form action={handleSignOut}>
              <button 
                type="submit" 
                className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
              >
                Đăng xuất
              </button>
            </form>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Đăng nhập
          </Link>
        )}
      </div>

      {/* Grid danh sách khóa học của bạn */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {publicCourses.map((course) => (
          <CourseCardClient
            key={course.id}
            thumbnail={course.thumbnail}
            title={course.title}
            price={course.price}
            lessons={course.lessons}
            students={course.students}
            comingSoon={course.comingSoon}
          />
        ))}
      </div>
    </div>
  );
}