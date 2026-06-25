import courses from "@/data/courses.json";
import { CourseCardAdmin } from "@/components/course-card-admin";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <div>
      <Button>Create Course</Button>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {courses.map((course) => (
          <CourseCardAdmin
            key={course.id}
            thumbnail={course.thumbnail}
            title={course.title}
            status={course.status as "draft" | "published"}
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