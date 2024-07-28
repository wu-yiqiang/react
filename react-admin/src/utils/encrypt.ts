import CryptoJS from "crypto-js";
/**
 *
 * @param data
 * @returns {*}
 */
export function AES_ECB_ENCRYPT(data: string, secretKey: string) {
  if (!data) return null
  const newKey = processKey(secretKey);
  const key = CryptoJS.enc.Utf8.parse(newKey);
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
export function AES_ECB_DECRYPT(data: string, secretKey: string) {
  if (!data) return null
  const newKey = processKey(secretKey);
  const key = CryptoJS.enc.Utf8.parse(newKey);
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

function processKey(secretKey: string) {
  let newKey = "";
  if (secretKey.length > 16) {
    newKey = secretKey.slice(0, 16);
  }
  if (secretKey.length == 16) {
    newKey = secretKey;
  }
  if (secretKey.length < 16) {
    newKey = secretKey;
    newKey = newKey.padEnd(16, "0");
  }
  return newKey
}
