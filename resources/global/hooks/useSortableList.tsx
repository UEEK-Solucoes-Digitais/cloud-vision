// import { useCallback, useEffect, useState } from 'react'
// import useSWR, { mutate } from 'swr'

// import getFetcher from '@/app/(admin)/utils/getFetcher'
// import { AxiosConfig } from '@/consts/axios-config'
// import axios from 'axios'

// import Sortable, { SortableEvent, Swap } from 'sortablejs'

// Sortable.mount(new Swap())

// export default function useSortableList(apiUrl: string, updateUrl: string, dataType: string) {
//     const { data, error, isLoading } = useSWR(apiUrl, getFetcher)
//     const [sortableList, setSortableList] = useState([])

//     useEffect(() => {
//         if (data && data[dataType]) {
//             setSortableList(data[dataType])
//         }
//     }, [data])

//     const onEnd = useCallback(
//         (event: SortableEvent) => {
//             const oldIndex = typeof event.oldIndex === 'number' ? event.oldIndex : null
//             const newIndex = typeof event.newIndex === 'number' ? event.newIndex : null

//             if (oldIndex === null || newIndex === null || oldIndex === newIndex) {
//                 return
//             }

//             const newList = [...sortableList]
//             newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
//             setSortableList(newList)

//             axios.put(updateUrl, { sortableList: newList }, AxiosConfig).then(() => {
//                 mutate(apiUrl)
//             })
//         },
//         [sortableList, updateUrl],
//     )

//     return { sortableList, setSortableList, onEnd, isLoading, error }
// }
