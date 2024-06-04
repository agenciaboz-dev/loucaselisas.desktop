import React from "react"
import { Lesson } from "../../types/server/class/Course/Lesson"
import { slugify } from "../../tools/urlMask"
import { DataCard } from "../../components/courses/DataCard"

interface LessonPathsProps {
    lesson: Lesson
}

export const LessonPaths: React.FC<LessonPathsProps> = ({ lesson }) => {
    return (
        <DataCard
            key={lesson.id}
            lesson={lesson}
            image={lesson.thumb || lesson.media.url}
            title={lesson.name}
            description={lesson.info}
            likes={lesson.likes}
            downloads={lesson.downloads}
            views={lesson.views}
            userName={lesson.course.name}
            link={`/licoes/${slugify(lesson.name)}?id:${lesson.id}`}
            routerParam={{ lesson }}
        />
    )
}
