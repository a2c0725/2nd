// `used` prop（string | string[]）を、対応する CSS Modules のクラス名配列に変換する。
// components/Shared/* の各コンポーネントで共通利用する。
export function usedClasses(styles: Record<string, string>, used?: string | string[]) {
  if (!used) return []
  return (Array.isArray(used) ? used : [used]).map((key) => styles[key])
}
