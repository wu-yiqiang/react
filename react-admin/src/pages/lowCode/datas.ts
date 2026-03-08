import { random } from "lodash-es";

export const FormData = [
  {
    id: random(),
    type: 'Titles',
    title: '标题',
    props: {
      text: '一行标题',
      isCenter: true,
      level: 1
    }
  },
  {
    id: random(),
    type: 'Inputs',
    title: '输入框',
    props: {
      text: '输入框',
      placeholder: "请输入文本",
    }
  }
]