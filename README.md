# Risy DAO Management Panel

<p align="center">
  <img src="https://raw.githubusercontent.com/RisyDAO/Risy-DAO/d01d4ab900d51a305e8de96ca937e0a5674f0c29/img/logo.png" alt="Risy DAO Logo" width="200"/>
</p>

<p align="center">
  <a href="https://polygonscan.com/token/0xca154cF88F6ffBC23E16B5D08a9Bf4851FB97199">
    <img src="https://img.shields.io/badge/Contract-Verified-brightgreen" alt="Contract">
  </a>
  <a href="https://github.com/RisyDAO/Risy-DAO-Panel/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/RisyDAO/Risy-DAO-Panel" alt="License">
  </a>
  <a href="https://polygon.technology/">
    <img src="https://img.shields.io/badge/Network-Polygon-8247e5" alt="Polygon">
  </a>
</p>

## Overview

Risy DAO Management Panel is a decentralized application (dApp) built on the Polygon network that provides a user-friendly interface for managing RISY tokens. The platform enables users to buy, sell, and transfer tokens while automatically handling ICO HODL limits and daily transfer restrictions.

### Key Features

- 🔐 Secure in-app wallet integration with Thirdweb
- 💱 Token operations with automatic limit calculations
- 📊 Real-time balance and analytics tracking
- 🌐 Multi-language support (EN/TR)
- 📱 Responsive design
- ⚡ Built on Polygon for fast, low-cost transactions

## Smart Contract Details

- **Token Contract**: [`0xca154cF88F6ffBC23E16B5D08a9Bf4851FB97199`](https://polygonscan.com/token/0xca154cF88F6ffBC23E16B5D08a9Bf4851FB97199)
- **DAO Contract**: [`0xD74E510a6472B20910ABCF8a3945E445b16aE11A`](https://polygonscan.com/address/0xD74E510a6472B20910ABCF8a3945E445b16aE11A)
- **Liquidity Pools**:
  - RISY/USDC: [`0xb908228a001cb177ac785659505ebca1d9947ee8`](https://www.geckoterminal.com/polygon_pos/pools/0xb908228a001cb177ac785659505ebca1d9947ee8)
  - RISY/PAXG: [`0x8341b5240e05552d85e78bcd691b2982c3e4deaf`](https://www.geckoterminal.com/polygon_pos/pools/0x8341b5240e05552d85e78bcd691b2982c3e4deaf)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet
- Polygon network configured in your wallet

### Installation

1. Clone the repository:

git clone https://github.com/RisyDAO/Risy-DAO-Panel.git
cd Risy-DAO-Panel

2. Install dependencies:

npm install
# or
yarn install

3. Create environment file:

cp .env.example .env

4. Configure your environment variables:

REACT_APP_POLYGON_RPC_URL=your_polygon_rpc_url
REACT_APP_RISY_CONTRACT=0xca154cF88F6ffBC23E16B5D08a9Bf4851FB97199
REACT_APP_DAO_ADDRESS=0xD74E510a6472B20910ABCF8a3945E445b16aE11A

5. Start the development server:

npm start
# or
yarn start

## Token Specifications

- Initial Supply: 1,000,000,000,000 RISY
- Maximum Supply: 2x initial supply
- Creator Holdings: 2% of initial supply
- Initial Liquidity: $20,000 (50% USDC, 50% PAXG)
- DAO Fee: 0.1% per transfer
- Daily Transfer Limit: 10% of balance
- ICO Maximum Balance: 0.75% (~7.5B RISY)

## Analytics & Resources

- [Token Analytics](https://dune.com/risydao/risydaoanalytics)
- [DEX Tools](https://www.dextools.io/app/tr/polygon/pair-explorer/0xb908228a001cb177ac785659505ebca1d9947ee8)
- [Governance Portal](https://www.tally.xyz/gov/risydao)
- [QuickSwap](https://quickswap.exchange/#/swap?currency0=ETH&swapIndex=1&currency1=0xca154cF88F6ffBC23E16B5D08a9Bf4851FB97199)

## Alternative Mirrors

- Main Website: [https://risy.io](https://risy.io)
- GitHub Mirror: [https://risydao.github.io/Risy-DAO/](https://risydao.github.io/Risy-DAO/)
- IPFS Mirror: [ipfs.io](https://ipfs.io/ipfs/bafybeibhq6qwgakj4lmcvgrknedys4w2beheru33byj2sat3x7il24k2ge)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

For UI contributions, please refer to our [Theme Guide](./Risy%20DAO%20Theme%20Guide.md) to maintain consistency.

## Security Features

- Automatic transfer limit calculations
- ICO HODL limit enforcement
- Smart contract interaction validation
- Network validation
- Rate limiting
- Comprehensive error handling

## Community & Support

- X (Twitter): [@RisyDAO](https://x.com/RisyDAO)
- Telegram: [RisyDAOCommunity](https://t.me/RisyDAOCommunity)
- Discord: [Risy DAO Community](https://discord.gg/zuSBq2XBjc)
- Medium: [risydao.medium.com](https://risydao.medium.com)
- GitHub: [github.com/RisyDAO](https://github.com/RisyDAO)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.