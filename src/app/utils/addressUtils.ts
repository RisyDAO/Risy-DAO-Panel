/**
 * Utility functions for Ethereum address operations
 */

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Validates if a string is a valid Ethereum address
 * @param address The address to validate
 * @returns boolean indicating if the address is valid
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Checks if an address is a burn address (null address)
 * @param address The address to check
 * @returns boolean indicating if the address is a burn address
 */
export function isBurnAddress(address: string): boolean {
  return address.toLowerCase() === NULL_ADDRESS.toLowerCase();
}

/**
 * Checks if an address is the DAO address
 * @param address The address to check
 * @param daoAddress The DAO address to compare against
 * @returns boolean indicating if the address is the DAO address
 */
export function isDAOAddress(address: string, daoAddress: string): boolean {
  return address.toLowerCase() === daoAddress.toLowerCase();
} 