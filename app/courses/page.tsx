import courses from "@/data/courses.json";
import { CourseCardClient } from "@/components/course-card-client";

export default function CoursesPage() {
  const publicCourses = courses.filter(
    (course) => course.status === "published"
  );

  return (
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
  );
}