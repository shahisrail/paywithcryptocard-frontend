interface CryptoPrice {
  usd: number;
}

interface CoinGeckoResponse {
  [key: string]: CryptoPrice;
}

// Get crypto prices from CoinGecko API
export const getCryptoPrices = async (): Promise<CoinGeckoResponse> => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usdt,tether&vs_currencies=usd'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

// Get price for specific cryptocurrency
export const getCryptoPrice = async (currency: string): Promise<number> => {
  try {
    // Handle stablecoins - both USDT and USDC are $1
    if (currency.includes('USDT') || currency.includes('USDC')) {
      return 1; // USDT and USDC are stablecoins pegged to $1
    }

    const prices = await getCryptoPrices();

    const priceMap: Record<string, string> = {
      BTC: 'bitcoin',
      ETH: 'ethereum',
    };

    const coinId = priceMap[currency];
    if (!coinId) {
      // For Monero or others, return 0 or fetch separately
      if (currency === 'XMR') {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd'
        );
        const data: CoinGeckoResponse = await response.json();
        return data.monero?.usd || 0;
      }
      return 0;
    }

    return prices[coinId]?.usd || 0;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return 0;
  }
};

// Convert USD to crypto amount
export const convertUsdToCrypto = async (
  usdAmount: number,
  currency: string
): Promise<number> => {
  const price = await getCryptoPrice(currency);
  if (price === 0) return 0;
  return usdAmount / price;
};

// Convert crypto to USD amount
export const convertCryptoToUsd = async (
  cryptoAmount: number,
  currency: string
): Promise<number> => {
  const price = await getCryptoPrice(currency);
  return cryptoAmount * price;
};
