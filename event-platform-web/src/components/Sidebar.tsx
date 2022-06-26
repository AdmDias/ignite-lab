import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSON_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            id
            lessonType
            availableAt
            title 
            slug
        }
    }
`

interface GetLessonsQueryResponse {
    lessons: {
        id: string
        title: string
        slug: string
        availableAt: string
        lessonType: 'live' | 'class'
    }[]
}

export function Sidebar(){
    const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSON_QUERY)


    return (
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="block font-bold text-2xl pb-6 mb-6 border-b border-gray-500">
                Cronograma de aulas
            </span>
            <div className="flex flex-col gap-8">
                {
                    data?.lessons.map(({ id, title, slug, availableAt, lessonType }) => {
                        return (
                            <Lesson
                                key={id}
                                title={title}
                                slug={slug}
                                availableAt={new Date(availableAt)}
                                type={lessonType}
                            />
                        )
                    })
                }
            </div>
        </aside>
    )
}