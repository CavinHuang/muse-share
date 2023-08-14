// 写一个lodash的get方法
export function collectionGet(source: unknown, path: string, defaultValue = undefined) {
  const paths = path.replace(/\[(\w+)\]/g, '.$1').replace(/\["(\w+)"\]/g, '.$1').replace(/\['(\w+)'\]/g, '.$1').split('.')
  let result = source as any
  for (const p of paths)
    result = result?.[p]

  return result === undefined ? defaultValue : result
}

// test collectionGet
// console.log(collectionGet({ a: { b: { c: 1 } } }, 'a.b.c'))