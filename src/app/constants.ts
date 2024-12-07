export const CONTRACTS = {
  RISY_TOKEN: "0xca154cF88F6ffBC23E16B5D08a9Bf4851FB97199",
  DAO: "0xD74E510a6472B20910ABCF8a3945E445b16aE11A",
} as const;

export const RISY_TOKEN_CONFIG = {
  name: "Risy DAO",
  symbol: "RISY",
  decimals: 18,
  icon: "./img/logo.png",
} as const;

export const RISY_DAO = CONTRACTS.DAO;