// limit text char function
export default function limitTextChar(text, limit) {
  if (text.length > limit) {
    return text.slice(0, limit) + '..'
  }
  return text
}
