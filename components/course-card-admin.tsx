import Image from "next/image";
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
    IconEdit,
} from "@tabler/icons-react";




type CourseCardAdminProps = {
    thumbnail: string;
    title: string;
    status: "draft" | "published";
    price: number;
    lessons: number;
    students: number;
    comingSoon?: boolean;
};

export function CourseCardAdmin({
    thumbnail,
    title,
    status,
    price,
    lessons,
    students,
    comingSoon
}: CourseCardAdminProps) {
    return (
        <Card className="overflow-hidden py-0 gap-0 flex flex-col h-full">
            <div className="relative aspect-video">
                <img
                    src={thumbnail}
                    alt={title}
                    className="h-full w-full object-cover"
                />

                <Badge
                    className="absolute top-3 right-3"
                    variant={status === "published" ? "default" : "secondary"}
                >
                    {status === "published" ? "Công khai" : "Bản nháp"}
                </Badge>

                {comingSoon && (
                    <Badge variant="secondary"
                    className="absolute bottom-3 right-3 ">
                        Săp ra mắt
                    </Badge>
                )}
                
            </div>

            <CardContent className="p-4 space-y-2 flex-1">
                <div>
                    <h3 className="line-clamp-2 font-semibold text-lg">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                       {price.toLocaleString("vi-VN")} đ
                    </span>

                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <IconBook size={16} />
                        {lessons} Bài học
                    </div>

                    <div className="flex items-center gap-1">
                        <IconUsers size={16} />
                        {students} Học viên
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t p-4">
                <Button className="w-full">
                    <IconEdit size={16} />
                    Chỉnh sửa
                </Button>   
            </CardFooter>
        </Card>
    );
}