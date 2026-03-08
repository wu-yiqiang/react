export type titleProps = {
  text?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
}

export const defaultTitleProps: titleProps = {
  text: "一行标题",
  level: 1,
  isCenter: false
}