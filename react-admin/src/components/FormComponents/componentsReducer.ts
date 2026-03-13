import { ComponentPropsType } from "."

export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  pros: ComponentPropsType
}

export type ComponentStateType = {
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentStateType = {
  componentList: []
}

