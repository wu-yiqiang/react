export default function Head() {
  return (
    <span style={{ "display": "flex", "justifyContent": "flex-end"}}>
      <Search />
      <Translate />
      <Theme />
      <Notion />
      <Setting />
      <User />
    </span>
  )
}


function Search() {
  return "搜索"
}

function Translate() {
  return '翻译'
}

function Theme() {
  return '主题'
}

function Notion() {
  return '通知'
}

function Setting() {
  return '设置'
}

function User() {
  return '用户'
}