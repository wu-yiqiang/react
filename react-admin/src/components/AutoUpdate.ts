let lastSrcs: (string|undefined)[]
const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;

async function extractNewScripts() {
  const html = await fetch('/?_timestamp=' + Date.now()).then((resp) => resp.text())
  scriptReg.lastIndex = 0
  let result = []
  let match
  while ((match = scriptReg.exec(html))) {
    result.push(match?.groups?.src)
  }
  return result
}

async function needUpdate() {
  const newScripts = await extractNewScripts()
  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }
  let result = false
  if (lastSrcs.length !== newScripts.length) {
    return true
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] != newScripts[i]) {
      result = true
      break
    }
  }
  lastSrcs = newScripts
  return result
}

const DURATION = 1000 * 60

function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      const result = await confirm('版本有更新，点击确定刷新页面')
      if (result) {
        location.reload()
      }
    }
    autoRefresh()
  }, DURATION);
}

export default autoRefresh;
