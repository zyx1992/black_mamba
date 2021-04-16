import JsEncrypt from 'jsencrypt'

export function handleRsaPassword(rsa, val) {
  let en = new JsEncrypt()
  en.setPublicKey(rsa)
  return en.encrypt(val)
}
