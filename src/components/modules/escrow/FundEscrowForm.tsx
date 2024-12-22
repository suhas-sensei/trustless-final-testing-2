"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFundEscrowHook } from "./hooks/fund-escrow.hook";
import { TooltipInfo } from "./EscrowFormField";
import { MoonPayWidget } from "@/components/modules/moonpay/MoonPayWidget";
import { useMoonPay } from "@/hooks/useMoonPay";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function FundEscrowForm() {
  const { onSubmit, form } = useFundEscrowHook();
  const { isWidgetOpen, setIsWidgetOpen } = useMoonPay();
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet",
  );

  const handleSubmit = async (values: any) => {
    if (paymentMethod === "card") {
      setIsWidgetOpen(true);
    } else {
      await onSubmit(values);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="contractId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Contract ID
                <TooltipInfo content="Unique identifier for this escrow contract." />
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter the contract id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="engagementId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Engagement
                <TooltipInfo content="ID to identify escrows for a service provider." />
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter the engagement" {...field} />
              </FormControl>
              <FormDescription>
                This engagement will help you identify the escrows associated
                with a service provider.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Amount
                <TooltipInfo content="Amount to fund the escrow with." />
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) =>
                    setPaymentMethod(value as "wallet" | "card")
                  }
                  defaultValue="wallet"
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="wallet" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Pay with Wallet
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Pay with Card (via MoonPay)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full md:w-1/4" type="submit">
          Fund Escrow
        </Button>

        <MoonPayWidget
          isOpen={isWidgetOpen}
          onClose={() => setIsWidgetOpen(false)}
          contractId={form.getValues("contractId")}
          amount={parseFloat(form.getValues("amount") || "0")}
        />
      </form>
    </Form>
  );
}
