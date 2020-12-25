export const formatPopulation = (x): string => {
  if (x === undefined) return ''
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
