# ton-sbt-nft

## Project structure

- `contracts` - source code of all the smart contracts of the project and their dependencies.
- `deployment` - deployed contract addresses.
- `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
- `scripts` - scripts used by the project, mainly the deployment scripts.
- `src` - express restful api backend.

## How to use

### Build

`bun run build`

### Deploy or run another script

`bun run start`

### Generate SVG image/metadata json and upload to ipfs

`bun run upload`

### Start REST API server

`bun run server`
