import { useCallback, useState } from 'react'

import axios from 'axios'

import { router } from '@inertiajs/react'
import Sortable, { Swap, type SortableEvent } from 'sortablejs'

Sortable.mount(new Swap())

export default function useSortableList(updateUrl: string, dataType: string) {
    // const { data, error, isLoading } = useSWR(apiUrl, getFetcher)
    const [sortableList, setSortableList] = useState([])

    // useEffect(() => {
    //     if (data && data[dataType]) {
    //         setSortableList(data[dataType])
    //     }
    // }, [data])
    router.reload({ only: [dataType] })

    const onEnd = useCallback(
        (event: SortableEvent) => {
            const oldIndex = typeof event.oldIndex === 'number' ? event.oldIndex : null
            const newIndex = typeof event.newIndex === 'number' ? event.newIndex : null

            if (oldIndex === null || newIndex === null || oldIndex === newIndex) {
                return
            }

            const newList = [...sortableList]
            newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
            setSortableList(newList)

            axios
                .put(
                    updateUrl,
                    { sortableList: newList },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )
                .then(() => {
                    router.reload({ only: [dataType] })
                })
        },
        [sortableList, updateUrl],
    )

    return { sortableList, setSortableList, onEnd }
}
