import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  IconUsers,
  IconBook,
} from "@tabler/icons-react";

type CourseCardClientProps = {
  thumbnail: string;
  title: string;
  price: number;
  lessons: number;
  students: number;
  comingSoon?: boolean;
};

export function CourseCardClient({
  thumbnail,
  title,
  price,
  lessons,
  students,
  comingSoon,
}: CourseCardClientProps) {
  return (
    <Card className="overflow-hidden py-0 gap-0 flex flex-col h-full max-w-sm">
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />

        {comingSoon && (
          <Badge className="absolute top-3 right-3">
            Coming Soon
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3 flex-1">
        <h3 className="line-clamp-2 font-semibold text-lg">
          {title}
        </h3>

        <div className="text-2xl font-bold">
          {price.toLocaleString("vi-VN")} đ
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <IconBook size={16} />
            {lessons} bài học
          </div>

          {students > 0 && !comingSoon && (
            <div className="flex items-center gap-1">
              <IconUsers size={16} />
              {students} học viên
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        {!comingSoon ? (
          <Button className="w-full">
            Học ngay
          </Button>
        ) : (
          <Button
            className="w-full"
            variant="secondary"
            disabled
          >
            Sắp ra mắt
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}