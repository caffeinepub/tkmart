import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useCart } from "../hooks/useCart";
import { getSavedAddresses } from "./CustomerAccountPage";

const ORDER_CODES_KEY = "tkmart_order_codes";

function generateVerifCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function saveOrderCode(orderId: string, code: string) {
  try {
    const codes = JSON.parse(localStorage.getItem(ORDER_CODES_KEY) ?? "{}");
    codes[orderId] = code;
    localStorage.setItem(ORDER_CODES_KEY, JSON.stringify(codes));
  } catch {}
}

function formatPrice(price: bigint) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}

type Step = "address" | "payment" | "confirm";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { actor } = useActor();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("address");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const [verifCode, setVerifCode] = useState<string>("");

  const savedAddresses = getSavedAddresses();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [payment, setPayment] = useState<"cod" | "upi">("cod");
  const [upiTxId, setUpiTxId] = useState("");
  const [deliveryCharge] = useState<bigint>(() => {
    const stored = localStorage.getItem("tkmart_delivery_charge");
    return BigInt(stored ? Number.parseInt(stored, 10) : 0);
  });

  const updateForm =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSelectSavedAddress = (id: string) => {
    const addr = savedAddresses.find((a) => a.id === id);
    if (!addr) return;
    setForm((prev) => ({
      ...prev,
      houseName: addr.houseName,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      landmark: addr.landmark || "",
    }));
    setLocationCoords(null);
    toast.success(`Address "${addr.label}" applied!`);
  };

  const buildAddress = () => {
    const parts = [
      form.houseName,
      form.street,
      form.city,
      form.state,
      form.pincode,
      form.landmark ? `Landmark: ${form.landmark}` : "",
      locationCoords
        ? `[Map: ${locationCoords.lat.toFixed(5)},${locationCoords.lng.toFixed(5)}]`
        : "",
    ].filter(Boolean);
    return parts.join(", ");
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLocationCoords({ lat, lng });
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            { headers: { "Accept-Language": "en" } },
          );
          const data = await resp.json();
          const addr = data.address || {};
          setForm((prev) => ({
            ...prev,
            city:
              addr.city ||
              addr.town ||
              addr.village ||
              addr.district ||
              prev.city,
            state: addr.state || prev.state,
            street:
              addr.road || addr.suburb || addr.neighbourhood || prev.street,
            pincode: addr.postcode || prev.pincode,
          }));
          toast.success(
            "Location detected! Please verify and complete your address.",
          );
        } catch {
          toast.error("Could not fetch address details. Please fill manually.");
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setLocationLoading(false);
        toast.error(
          err.code === 1
            ? "Location permission denied"
            : "Could not detect location",
        );
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  const stepIndex = { address: 0, payment: 1, confirm: 2 };

  async function handlePlaceOrder() {
    if (!actor) return;
    setLoading(true);
    try {
      const paymentMethod =
        payment === "cod"
          ? { __kind__: "cod" as const, cod: null }
          : { __kind__: "upi" as const, upi: { transactionId: upiTxId } };

      const id = await actor.placeOrder(
        form.name,
        form.altPhone ? `${form.phone} / Alt: ${form.altPhone}` : form.phone,
        buildAddress(),
        items.map((i) => ({
          productId: i.productId,
          quantity: BigInt(i.quantity),
          price: i.price,
        })),
        total + deliveryCharge,
        paymentMethod,
      );
      setOrderId(id);
      const code = generateVerifCode();
      setVerifCode(code);
      saveOrderCode(id.toString(), code);
      clearCart();
      setStep("confirm");
      toast.success("Order placed successfully!");
    } catch (e) {
      toast.error("Failed to place order. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && step !== "confirm") {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" data-ocid="checkout.page">
      <h1 className="font-display text-3xl font-bold mb-6">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-8" data-ocid="checkout.steps.panel">
        {(["address", "payment", "confirm"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                stepIndex[step] > i
                  ? "bg-success text-white"
                  : stepIndex[step] === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {stepIndex[step] > i ? "✓" : i + 1}
            </div>
            <span
              className={`ml-2 text-sm capitalize ${
                s === step ? "font-semibold" : "text-muted-foreground"
              }`}
            >
              {s}
            </span>
            {i < 2 && <div className="flex-1 h-px bg-border mx-3" />}
          </div>
        ))}
      </div>

      {step === "address" && (
        <Card data-ocid="checkout.address.panel">
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Saved Address Selector */}
            {savedAddresses.length > 0 && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2">
                <p className="text-xs font-semibold text-primary flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Choose a Saved Address
                </p>
                <Select
                  onValueChange={handleSelectSavedAddress}
                  data-ocid="checkout.saved_address.select"
                >
                  <SelectTrigger
                    className="bg-background"
                    data-ocid="checkout.saved_address.select"
                  >
                    <SelectValue placeholder="Select a saved address..." />
                  </SelectTrigger>
                  <SelectContent>
                    {savedAddresses.map((addr) => (
                      <SelectItem key={addr.id} value={addr.id}>
                        <span className="font-medium">{addr.label}</span>
                        <span className="text-muted-foreground text-xs ml-2">
                          — {addr.street}, {addr.city}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Full Name */}
            <div>
              <Label>Full Name *</Label>
              <Input
                value={form.name}
                onChange={updateForm("name")}
                placeholder="Your full name"
                className="mt-1"
                data-ocid="checkout.name.input"
              />
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Phone Number *</Label>
                <Input
                  value={form.phone}
                  onChange={updateForm("phone")}
                  placeholder="10-digit phone"
                  className="mt-1"
                  data-ocid="checkout.phone.input"
                />
              </div>
              <div>
                <Label>Alternate Phone (Optional)</Label>
                <Input
                  value={form.altPhone}
                  onChange={updateForm("altPhone")}
                  placeholder="Alternate phone"
                  className="mt-1"
                  data-ocid="checkout.altphone.input"
                />
              </div>
            </div>

            {/* Use Current Location */}
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full border-primary/40 hover:border-primary gap-2"
                onClick={handleUseLocation}
                disabled={locationLoading}
                data-ocid="checkout.location.button"
              >
                {locationLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4 text-primary" />
                )}
                {locationLoading
                  ? "Detecting location..."
                  : "Use Current Location"}
              </Button>
              {locationCoords && (
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Location detected - fields
                  auto-filled below
                </p>
              )}
            </div>

            {/* House / Flat */}
            <div>
              <Label>House / Flat / Building Name *</Label>
              <Input
                value={form.houseName}
                onChange={updateForm("houseName")}
                placeholder="House no., flat, building name"
                className="mt-1"
                data-ocid="checkout.house.input"
              />
            </div>

            {/* Street */}
            <div>
              <Label>Street / Area *</Label>
              <Input
                value={form.street}
                onChange={updateForm("street")}
                placeholder="Street, locality, area"
                className="mt-1"
                data-ocid="checkout.street.input"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>City *</Label>
                <Input
                  value={form.city}
                  onChange={updateForm("city")}
                  placeholder="City"
                  className="mt-1"
                  data-ocid="checkout.city.input"
                />
              </div>
              <div>
                <Label>State *</Label>
                <Input
                  value={form.state}
                  onChange={updateForm("state")}
                  placeholder="State"
                  className="mt-1"
                  data-ocid="checkout.state.input"
                />
              </div>
            </div>

            {/* PIN + Landmark */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>PIN Code *</Label>
                <Input
                  value={form.pincode}
                  onChange={updateForm("pincode")}
                  placeholder="6-digit PIN"
                  className="mt-1"
                  data-ocid="checkout.pincode.input"
                />
              </div>
              <div>
                <Label>Landmark (Optional)</Label>
                <Input
                  value={form.landmark}
                  onChange={updateForm("landmark")}
                  placeholder="Near school, temple..."
                  className="mt-1"
                  data-ocid="checkout.landmark.input"
                />
              </div>
            </div>

            <Button
              className="w-full"
              disabled={
                !form.name ||
                !form.phone ||
                !form.houseName ||
                !form.street ||
                !form.city ||
                !form.state ||
                !form.pincode
              }
              onClick={() => setStep("payment")}
              data-ocid="checkout.address.submit_button"
            >
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "payment" && (
        <Card data-ocid="checkout.payment.panel">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={payment}
              onValueChange={(v) => setPayment(v as "cod" | "upi")}
            >
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer">
                <RadioGroupItem
                  value="cod"
                  id="cod"
                  data-ocid="checkout.cod.radio"
                />
                <Label htmlFor="cod" className="cursor-pointer flex-1">
                  <span className="font-semibold">Cash on Delivery</span>
                  <p className="text-xs text-muted-foreground">
                    Pay when you receive your order
                  </p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer">
                <RadioGroupItem
                  value="upi"
                  id="upi"
                  data-ocid="checkout.upi.radio"
                />
                <Label htmlFor="upi" className="cursor-pointer flex-1">
                  <span className="font-semibold">Manual UPI</span>
                  <p className="text-xs text-muted-foreground">
                    Transfer to our UPI ID and enter transaction ID
                  </p>
                </Label>
              </div>
            </RadioGroup>
            {payment === "upi" && (
              <div className="bg-muted rounded-lg p-4 space-y-3">
                {(() => {
                  const qr = localStorage.getItem("tkmart_payment_qr") ?? "";
                  const upiId =
                    localStorage.getItem("tkmart_payment_upi_id") ??
                    "tkmart@upi";
                  return (
                    <>
                      <p className="text-sm font-medium">
                        Transfer {formatPrice(total + deliveryCharge)} to:{" "}
                        <span className="font-bold text-primary">{upiId}</span>
                      </p>
                      {qr && (
                        <div className="flex flex-col items-center gap-2 py-2">
                          <img
                            src={qr}
                            alt="Scan to Pay"
                            className="w-44 h-44 object-contain bg-white rounded-lg p-2 border"
                          />
                          <p className="text-xs text-muted-foreground">
                            Scan QR code to pay via UPI
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
                <div>
                  <Label>UPI Transaction ID</Label>
                  <Input
                    value={upiTxId}
                    onChange={(e) => setUpiTxId(e.target.value)}
                    placeholder="Enter transaction ID after payment"
                    className="mt-1"
                    data-ocid="checkout.upi_txid.input"
                  />
                </div>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery Charge</span>
              <span data-ocid="checkout.delivery_charge.panel">
                {deliveryCharge > 0n ? formatPrice(deliveryCharge) : "Free"}
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>{formatPrice(total + deliveryCharge)}</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("address")}
                className="flex-1"
                data-ocid="checkout.back.button"
              >
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={loading || (payment === "upi" && !upiTxId)}
                onClick={handlePlaceOrder}
                data-ocid="checkout.place_order.button"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Place Order
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "confirm" && orderId && (
        <Card className="text-center" data-ocid="checkout.success.panel">
          <CardContent className="py-12">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">
              Order Placed!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your order ID is{" "}
              <span className="font-bold text-foreground">
                #{orderId.toString()}
              </span>
            </p>
            {verifCode && (
              <div
                className="mx-auto mb-6 max-w-xs rounded-xl border-2 p-4 text-center"
                style={{
                  borderColor: "oklch(0.78 0.14 85)",
                  background: "oklch(0.78 0.14 85 / 0.1)",
                }}
                data-ocid="checkout.verif_code.panel"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Delivery Verification Code
                </p>
                <p
                  className="text-5xl font-bold font-mono tracking-widest mb-2"
                  style={{ color: "oklch(0.78 0.14 85)" }}
                >
                  {verifCode}
                </p>
                <p className="text-xs text-muted-foreground">
                  Give this code to the delivery person when your order arrives.
                </p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => navigate(`/orders/${orderId}`)}
                data-ocid="checkout.view_order.button"
              >
                View Order
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/track")}
                data-ocid="checkout.track.button"
              >
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
