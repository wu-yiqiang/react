import Base64 from "crypto-js/enc-base64"
import HmacSHA1 from "crypto-js/hmac-sha1"
import { customRandom, random, urlAlphabet } from "nanoid"
import * as qiniu from "qiniu-js"

import { base64encode, safe64, utf16to8 } from "./tokenTools"

/**
 * 根据文件名获取它以 `时间戳+uuid` 的形式
 * @param {string} filename 文件名
 * @returns
 */
function getDateFilename(filename = "") {
  console.log("filename", filename)

  const currentTimestamp = new Date().toLocaleDateString()
  const fileSuffix =
    filename.split(`.`)[filename.split(`.`).length - 1] || "png"
  const customid = customRandom(urlAlphabet, 10, random)
  return `${currentTimestamp}/${customid()}.${fileSuffix}`
}

function getQiniuToken(accessKey, secretKey, putPolicy) {
  const policy = JSON.stringify(putPolicy)
  const encoded = base64encode(utf16to8(policy))
  const hash = HmacSHA1(encoded, secretKey)
  const encodedSigned = hash.toString(Base64)

  return `${accessKey}:${safe64(encodedSigned)}:${encoded}`
}

export interface QiniuConfig {
  accessKey: string
  secretKey: string
  bucket: string
  region: "z0" | "z1" | "z2" | "na0" | "as0" | "cn-east-2"
  path?: string
  domain: string
}

export async function qiniuUpload(file, qiniuConfig: QiniuConfig) {
  const { accessKey, secretKey, bucket, region, path, domain } = qiniuConfig

  const token = getQiniuToken(accessKey, secretKey, {
    scope: bucket,
    deadline: Math.trunc(new Date().getTime() / 1000) + 3600
  })
  const dir = path ? `${path}/` : ``
  const dateFilename = dir + getDateFilename(file.name)
  const observable = qiniu.upload(file, dateFilename, token, {}, { region })
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (err) => {
        reject(err.message)
      },
      complete: (result) => {
        resolve(`${domain}/${result.key}`)
      }
    })
  })
}
