/**
 * Utility functions for formatting numbers and balances
 */

/**
 * Formats a bigint value to a human-readable string with specified decimals
 * @param value The bigint value to format
 * @param decimals The number of decimal places
 * @returns Formatted string representation of the value
 */
export function formatBalance(value: bigint | undefined, decimals: number): string {
  if (!value) return "0";
  try {
    return (Number(value) / Math.pow(10, decimals)).toLocaleString('en-US', {
      maximumFractionDigits: 2,
      useGrouping: false
    });
  } catch (e) {
    return "0";
  }
}

/**
 * Converts a number to Wei (with specified decimals)
 * @param value The number to convert
 * @param decimals The number of decimal places
 * @returns bigint representation of the value in Wei
 */
export function toWei(value: string | number, decimals: number): bigint {
  return BigInt(Math.floor(Number(value) * Math.pow(10, decimals)));
}

/**
 * Formats time duration to a human-readable string
 * @param hours Hours component
 * @param minutes Minutes component
 * @param seconds Seconds component
 * @returns Formatted time string
 */
export function formatDuration(hours: number, minutes: number, seconds: number): string {
  return `${hours}h ${minutes}m ${seconds}s`;
} 