import { imageToDataURI } from '../image'
import { throw_type_error } from '../error'
import { isBase64, isVoid } from '../is'

/**
 * 此函数将 Blob 对象转换为数据 URI 字符串或 ArrayBuffer。
 * @public
 * @param  blob - `blob` 参数是一个 Blob 对象，它表示不可变的原始数据的类文件对象。它可用于表示不一定采用 JavaScript
 * 原生格式的数据。在这种情况下，该函数采用 Blob 对象并将其转换为数据 URI 字符串或 ArrayBuffer
 * @returns 解析为字符串或 ArrayBuffer 的 Promise，具体取决于将提供的 Blob 作为数据 URL 读取的结果。
 */
export function blobToDateURI(blob: Blob): Promise<string | ArrayBuffer> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      const result = e.target?.result
      if (!isVoid(result))
        resolve(result)

      else
        reject(new Error('blob transform dataUri failed'))
    }
    reader.readAsDataURL(blob)
  })
}

/**
* 此函数将 URL 作为输入并返回一个 Promise，该 Promise 解析为包含来自 URL 的数据的 Blob 对象。
* @public
* @param url - 需要转换为 Blob 对象的资源的 URL。
* @returns 函数 url_to_blob 返回解析为 Blob 对象的 Promise。
*/
export function urlToBlob(url: string): Promise<Blob> {
  const xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.responseType = 'arraybuffer'
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      const blob = new Blob([this.response])
      resolve(blob)
    }
    xhr.onerror = reject
    xhr.send()
  })
}

/**
 * 此函数将数据 URI 转换为 blob 对象。
 * @public
 * @param dataURI - 表示数据 URI 的字符串，其中包括以 base64 格式编码的文件的数据和元数据。
 * @param mimeType - dataURI 的 MIME 类型，指定 URI 中表示的数据类型。它是一个可选参数，如果未提供，该函数会尝试从 dataURI
 * 本身中提取它。
 * @returns 从 dataURI 字符串输入创建的 Blob 对象。 Blob 对象包含指定 MIME 类型的二进制数据。
 */
export function data_URI_to_blob(dataURI: string, mimeType?: string) {
  if (!isBase64(dataURI))
    throw_type_error('base64', 'dataURI')

  const arr = dataURI.split(',')
  mimeType ??= arr[0].match(/:(.*?);/)?.[1]
  let baseStr = ''
  try {
    baseStr = atob(arr[1])
  }
  catch (e) {
    throw_type_error('base64', 'dataURI')
  }
  let len = baseStr.length
  const u8arr = new Uint8Array(len)
  while (len--)
    u8arr[len] = baseStr.charCodeAt(len)

  return new Blob([u8arr], { type: mimeType })
}

/**
* 此函数将 URL 转换为图像的数据 URI。
* @public
* @param url - 需要转换为数据 URI 的图像的URL。
* @param type - 可选参数“type”是一个字符串，指定数据 URI
* 的图像格式。如果未提供，则默认值为“image/png”。其他可能的值包括“image/jpeg”和“image/webp”。
* @returns 解析为表示从提供的 URL 加载的图像的数据 URI 的字符串的 Promise。
*/
export function urlToDateURI(url: string, type?: string): Promise<string> {
  const img = new Image()
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(imageToDataURI(img, type))
    }
    img.onerror = reject
  })
}
