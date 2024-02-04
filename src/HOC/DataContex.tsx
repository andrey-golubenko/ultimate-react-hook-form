import { createContext, useContext, useMemo, useState } from 'react'

const DataContex = createContext<IUseData>({
  formData: {},
  setFormValue: () => null
})

export interface IFormFields {
  firstName?: string
  lastName?: string
  email?: string
  hasPhone?: boolean
  phoneNumber?: string
  password?: string
  passwordConfirmation?: string
  loadFiles?: File[]
  video?: string | null
}

interface IUseData {
  formData: IFormFields
  setFormValue: (value: NonNullable<IFormFields>) => void
}

export const DataProvider = ({ children }: React.PropsWithChildren) => {
  const [formData, setFormData] = useState({})

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
