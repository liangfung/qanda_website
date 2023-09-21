export function formatNumberUnit(
  number: string | number | undefined,
  decimals = 0,
): string {
  const sizes = ['', 'K', 'M']

  if (!number) return '0'
  if (Number(number) === 0) return '0'
  let _num = Number(number)
  let i = Math.floor(Math.log(Math.abs(_num)) / Math.log(1000))

  return (_num / Math.pow(1000, i)).toFixed(i > 0 ? decimals : 0) + sizes[i]
}
