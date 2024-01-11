import { useEffect, useState, useMemo } from 'react'

import { api } from '~/trpc/react'

export interface IKeyValueOption {
  label: string
  value: string
}

// type FirstParameterType<T> = T extends (_: infer U) => unknown ? U : never

function transformFn(data: Array<{ id: number, name: string }>) {
  console.log('catch new data:', data);
  return data.map(v => ({ label: v.name, value: `${v.id}` }))
}

export function useCategory(enabled = true) {
  const { data = [], refetch: onGetData } = api.category.findAll.useQuery(undefined, { enabled })
  const createAction = api.category.create.useMutation()
  const updateAction = api.category.update.useMutation()
  const deleteAction = api.category.delete.useMutation()

  // const [transformData, setTransformData] = useState<IKeyValueOption[]>(transformFn(data))

  // useEffect(() => {
  //   setTransformData(transformFn(data))
  // }, [data])

  const transformData = useMemo(() => transformFn(data), [data])

  const onCreateItem = async ({ label, value }: IKeyValueOption) => {
    return createAction.mutate({ name: label, slug: value })
  }

  const onUpdateItem = async (id: number, { label, value }: IKeyValueOption) => {
    return updateAction.mutate({ id, name: label, slug: value })
  }

  const onDeleteItem = async (id: number) => {
    return deleteAction.mutate(id)
  }

  return {
    data: transformData,
    onGetData,
    onCreateItem,
    onUpdateItem,
    onDeleteItem,
  }
}


