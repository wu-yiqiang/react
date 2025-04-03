// 修改为命名导入，避免默认导入的问题
import * as CryptoJS from "crypto-js";
/**
 * 加密
 * @param data
 * @returns {*}
 */
const SECRETKEY = "ERT34^123@`~4@^$%frrtAcErpoliTy&*";
export function AES_ECB_ENCRYPT(data: string, secretKey: string = SECRETKEY): string {
  if (!data) return ""
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const srcs = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * 解密
 * @param data
 * @returns {*}
 */
export function AES_ECB_DECRYPT(data: string, secretKey: string = SECRETKEY): string {
  if (!data) return ""
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
