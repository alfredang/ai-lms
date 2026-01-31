"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Lock,
  Check,
  Loader2,
  Shield,
} from "lucide-react";

interface CheckoutFormProps {
  courseTitle: string;
  coursePrice: number;
  courseId: string;
  onSuccess?: () => void;
}

export function CheckoutForm({
  courseTitle,
  coursePrice,
  courseId,
  onSuccess,
}: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleStripePayment = async () => {
    setIsLoading(true);
    // In production, this would call your Stripe API
    try {
      const response = await fetch("/api/payments/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          amount: coursePrice,
          paymentMethod: "card",
        }),
      });

      if (response.ok) {
        onSuccess?.();
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsLoading(true);
    // In production, this would redirect to PayPal
    try {
      const response = await fetch("/api/payments/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          amount: coursePrice,
        }),
      });

      const data = await response.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    } catch (error) {
      console.error("PayPal redirect failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "stripe") {
      handleStripePayment();
    } else {
      handlePayPalPayment();
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Checkout
        </CardTitle>
        <CardDescription>
          Complete your purchase securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Order Summary */}
        <div className="mb-6 rounded-lg bg-muted p-4">
          <h4 className="font-medium">Order Summary</h4>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{courseTitle}</span>
            <span className="font-semibold">${coursePrice.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="text-lg font-bold text-primary">
              ${coursePrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <Label className="mb-3 block">Payment Method</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(v) => setPaymentMethod(v as "stripe" | "paypal")}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="stripe"
                id="stripe"
                className="peer sr-only"
              />
              <Label
                htmlFor="stripe"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-600">Stripe</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Credit/Debit Card
                </span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
              />
              <Label
                htmlFor="paypal"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-600">PayPal</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  PayPal Account
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <form onSubmit={handleSubmit}>
          {paymentMethod === "stripe" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        number: formatCardNumber(e.target.value),
                      })
                    }
                    maxLength={19}
                    required
                  />
                  <div className="absolute right-3 top-1/2 flex -translate-y-1/2 gap-1">
                    <div className="flex h-5 w-8 items-center justify-center rounded border bg-white text-[8px] font-bold text-blue-600">
                      VISA
                    </div>
                    <div className="flex h-5 w-8 items-center justify-center rounded border bg-white text-[8px] font-bold text-red-500">
                      MC
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="rounded-lg border bg-blue-50 p-4 text-center dark:bg-blue-950/20">
              <p className="text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your purchase
                securely.
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="mt-6 w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : paymentMethod === "stripe" ? (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Pay ${coursePrice.toFixed(2)}
              </>
            ) : (
              <>
                <span className="mr-2 font-bold text-blue-600">PayPal</span>
                Checkout
              </>
            )}
          </Button>
        </form>

        {/* Security Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            SSL Encrypted
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            PCI Compliant
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Money Back Guarantee
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
