import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { verifyMoonPayTransaction } from "@/services/moonpay/moonpayService";
import { fundEscrow } from "@/services/escrow/fundEscrow";

export const useMoonPay = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const { toast } = useToast();

  const handleMoonPaySuccess = useCallback(
    async (transactionId: string, contractId: string) => {
      try {
        // Verify the transaction completed successfully
        const verification = await verifyMoonPayTransaction(transactionId);

        if (verification.status === "completed") {
          // Proceed with funding the escrow
          const result = await fundEscrow({
            contractId,
            engagementId: verification.engagementId,
            signer: verification.walletAddress,
          });

          toast({
            title: "Success",
            description: "Escrow funded successfully via MoonPay",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to complete MoonPay transaction",
          variant: "destructive",
        });
      }
    },
    [toast],
  );

  return {
    isWidgetOpen,
    setIsWidgetOpen,
    handleMoonPaySuccess,
  };
};
