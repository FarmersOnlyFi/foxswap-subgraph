import { Pair, Token, Bundle } from '../types/schema'
import { BigDecimal, Address, BigInt } from '@graphprotocol/graph-ts/index'
import { ZERO_BD, factoryContract, ADDRESS_ZERO, ONE_BD, UNTRACKED_PAIRS } from './helpers'

const WETH_ADDRESS = '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a'
const USDC_WETH_PAIR = '0x956d6cbc3cd41f436fe279564feca53b5a7b66ee' // created 10008355
// const DAI_WETH_PAIR = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11' // created block 10042267
// const USDT_WETH_PAIR = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852' // created block 10093341

export function getEthPriceInUSD(): BigDecimal {
  // fetch eth prices for each stablecoin
  // let daiPair = Pair.load(DAI_WETH_PAIR) // dai is token0
  let usdcPair = Pair.load(USDC_WETH_PAIR) // usdc is token0
  // let usdtPair = Pair.load(USDT_WETH_PAIR) // usdt is token1

  // all 3 have been created
  // if (daiPair !== null && usdcPair !== null && usdtPair !== null) {
  //   let totalLiquidityETH = daiPair.reserve1.plus(usdcPair.reserve1).plus(usdtPair.reserve0)
  //   let daiWeight = daiPair.reserve1.div(totalLiquidityETH)
  //   let usdcWeight = usdcPair.reserve1.div(totalLiquidityETH)
  //   let usdtWeight = usdtPair.reserve0.div(totalLiquidityETH)
  //   return daiPair.token0Price
  //     .times(daiWeight)
  //     .plus(usdcPair.token0Price.times(usdcWeight))
  //     .plus(usdtPair.token1Price.times(usdtWeight))
  //   // dai and USDC have been created
  // } else if (daiPair !== null && usdcPair !== null) {
  //   let totalLiquidityETH = daiPair.reserve1.plus(usdcPair.reserve1)
  //   let daiWeight = daiPair.reserve1.div(totalLiquidityETH)
  //   let usdcWeight = usdcPair.reserve1.div(totalLiquidityETH)
  //   return daiPair.token0Price.times(daiWeight).plus(usdcPair.token0Price.times(usdcWeight))
  //   // USDC is the only pair so far
  // } else 
  if (usdcPair !== null) {
    return usdcPair.token0Price
  } else {
    return ZERO_BD
  }
}

// token where amounts should contribute to tracked volume and liquidity
// token where amounts should contribute to tracked volume and liquidity
let WHITELIST: string[] = [
  '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a', // WONE
  '0xe176ebe47d621b984a73036b9da5d834411ef734', // 1BUSD
  '0x985458e523db3d53125813ed68c274899e9dfab4', // 1USDC
  '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f', // 1USDT
  '0x224e64ec1BDce3870a6a6c777eDd450454068FEC', // 1UST
  '0x0ab43550a6915f9f67d0c454c2e90385e6497eaa', // bBUSD
  '0xb1f6e61e1e113625593a22fa6aa94f8052bc39e0', // BNB
  '0x582617bd8ca80d22d4432e63fda52d74dcdcee4c', // ADA
  '0x6e7be5b9b4c9953434cd83950d61408f1ccc3bee', // MATIC
  '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687', // FOX
  "0x9d6cb12fd0b6a5e0bff64004b9097f1deadcac7b",
  "0xef977d2f931c1978db5f6747666fa1eacb0d0339",
  "0x6983d1e6def3690c4d616b13597a09e6193ea013",
  "0x301259f392b551ca8c592c9f676fcd2f9a0a84c5",
  "0x3095c7557bcb296ccc6e363de01b760ba031f2d9",
  "0x03732a1b4297ec285999402a9129cfad62a65463",
  "0xb12c13e66ade1f72f71834f2fc5082db8c091358",
  "0x7ca9c1d0bb11f1b7c31ee5538d7a75aaf2d8e2fc",
  "0x5b747e23a9e4c509dd06fbd2c0e3cb8b846e398f",
  "0x735abe48e8782948a37c7765ecb76b98cde97b0f",
  "0x5dce7a3e8b53387a9ee1ce0d855b7a8d948100a3",
  "0xf9565e8c4e13862f677f144b3cdc8700d9c4ba31",
  "0x2f459dd7cbcc9d8323621f6fb430cd0555411e7b",
  "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
  "0x218532a12a389a4a92fc0c5fb22901d1c19198aa",
  "0xda7fe71960cd1c19e1b86d6929efd36058f60a03",
  "0x95ce547d730519a90def30d647f37d9e5359b6ae",
  "0xd74433b187cf0ba998ad9be3486b929c76815215",
  "0x1449ab6c24dcf3dbc1971021f465af1b81f48f07",
  "0x53ba62ddd5a9a6b6d97c7a496d7832d13a9218c4",
  "0xd647090c1cdcdbb72de411b1ba16f03d4a7bba02",
  "0xed0b4b0f0e2c17646682fc98ace09feb99af3ade",
  "0x0c2868befb66144a82eb7a48383082e28f8e34fb",
  "0x22d62b19b7039333ad773b7185bb61294f3adc19",
  "0xcf1709ad76a79d5a60210f23e81ce2460542a836",
  "0xc079d0385492ac2d0e89ca079c186dd71ef49b1e",
  "0x0c8054cb26a92c90529c1705c06e27eb7afde501",
  "0x02f667745a77c376db5b232846d4b2454e533699",
  "0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4",
  "0x340042552d19211795dbe55d84fa2e63bc49b890",
  "0xe59aa7f9e91b4cc6c25d3542cecb851e0316138c"
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
let MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('400000')

// minimum liquidity for price to get tracked
let MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('2')

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (add stablecoin estimates)
 **/
export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == WETH_ADDRESS) {
    return ONE_BD
  }
  // loop through whitelist and check if paired with any
  for (let i = 0; i < WHITELIST.length; ++i) {
    let pairAddress = factoryContract.getPair(Address.fromString(token.id), Address.fromString(WHITELIST[i]))
    if (pairAddress.toHexString() != ADDRESS_ZERO) {
      let pair = Pair.load(pairAddress.toHexString())
      if (pair.token0 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
        let token1 = Token.load(pair.token1)
        return pair.token1Price.times(token1.derivedETH as BigDecimal) // return token1 per our token * Eth per token 1
      }
      if (pair.token1 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
        let token0 = Token.load(pair.token0)
        return pair.token0Price.times(token0.derivedETH as BigDecimal) // return token0 per our token * ETH per token 0
      }
    }
  }
  return ZERO_BD // nothing was found return 0
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token,
  pair: Pair
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // dont count tracked volume on these pairs - usually rebass tokens
  if (UNTRACKED_PAIRS.includes(pair.id)) {
    return ZERO_BD
  }

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (pair.liquidityProviderCount.lt(BigInt.fromI32(5))) {
    let reserve0USD = pair.reserve0.times(price0)
    let reserve1USD = pair.reserve1.times(price1)
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      if (reserve0USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve1USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0
      .times(price0)
      .plus(tokenAmount1.times(price1))
      .div(BigDecimal.fromString('2'))
  }

  // take full value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0)
  }

  // take full value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1)
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedLiquidityUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).plus(tokenAmount1.times(price1))
  }

  // take double value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).times(BigDecimal.fromString('2'))
  }

  // take double value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1).times(BigDecimal.fromString('2'))
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}