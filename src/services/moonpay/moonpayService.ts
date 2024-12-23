// import { useWalletStore } from "@/store/walletStore";
import { kit } from "@/wallet/walletKit";

interface MoonPayConfig {
  apiKey: string;
  baseUrl: string;
  currency: string;
}

const MOONPAY_CONFIG: MoonPayConfig = {
  apiKey: process.env.NEXT_PUBLIC_MOONPAY_API_KEY || "",
  baseUrl: "https://buy-staging.moonpay.com",
  currency: "usdc_xlm", // USDC on Stellar
};

export const generateMoonPayUrl = async (
  contractId: string,
  amount: number,
) => {
  const { address } = await kit.getAddress();

  const params = new URLSearchParams({
    apiKey: MOONPAY_CONFIG.apiKey,
    currencyCode: MOONPAY_CONFIG.currency,
    walletAddress: address,
    baseCurrencyAmount: amount.toString(),
    redirectURL: `${window.location.origin}/dashboard/escrow/fund-escrow/success?contractId=${contractId}`,
    failureRedirectURL: `${window.location.origin}/dashboard/escrow/fund-escrow/failure`,
  });

  return `${MOONPAY_CONFIG.baseUrl}?${params.toString()}`;
};

export const verifyMoonPayTransaction = async (transactionId: string) => {
  // This would hit your backend to verify the transaction
  const response = await fetch(
    `/api/verify-moonpay-transaction?transactionId=${transactionId}`,
  );
  return response.json();
};
