import Inputs from "./Input/Input";
import Titles from "./Title/Title";
import InputConf, { inputProps } from './Input'
import TitleConf, { titleProps } from './Title'
import { FC } from "react";

export type ComponentPropsType = titleProps | inputProps

export type ComponentConfType = {
  title: string,
  type: string,
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}
export const componentConfList: ComponentConfType[] = [TitleConf, InputConf]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type == type)
}
export const componentsGroup = [
  { groupName: '显示组件', components: [TitleConf] },
  { groupName: '表单组件', components: [InputConf] }
]