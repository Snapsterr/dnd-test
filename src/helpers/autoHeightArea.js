export const autoHeightArea = (ref, height, heightDiff) => {
  ref.current.style.height = `${height}px`
  ref.current.style.height = ref.current.scrollHeight - heightDiff + "px"
}
