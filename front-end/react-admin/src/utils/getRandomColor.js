export default function random_rgba(blur) {
  const o = Math.round,
    r = Math.random,
    s = 255
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    blur +
    ")"
  )
}
