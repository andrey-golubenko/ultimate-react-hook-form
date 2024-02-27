import { createContext, useContext, useMemo, useState } from 'react'
import { IFormFields } from '@/types'

const DataContex = createContext<IUseData>({
  formData: {},
  setFormValue: () => null
})

interface IUseData {
  formData: IFormFields
  setFormValue: (value: NonNullable<IFormFields>) => void
}

export const DataProvider = ({ children }: React.PropsWithChildren) => {
  const [formData, setFormData] = useState({ isDataReceived: false })

  const setFormValue = (value: NonNullable<unknown>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...value
    }))
  }

  const memorizedContext = useMemo(
    () => ({
      formData,
      setFormValue
    }),
    [formData]
  )

  return (
    <DataContex.Provider value={memorizedContext}>
      {children}
    </DataContex.Provider>
  )
}

export const useData: () => IUseData = () => useContext<IUseData>(DataContex)
