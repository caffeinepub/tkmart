import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  LogOut,
  MapPin,
  Package,
  Plus,
  Save,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCustomerSession, getCustomerSession } from "./CustomerLoginPage";

export interface SavedAddress {
  id: string;
  label: string;
  houseName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

const SAVED_ADDRESSES_KEY = "tkmart_saved_addresses";

// My E-Books helpers
const MY_EBOOKS_KEY_CA = "tkmart_my_ebooks";
const EBOOKS_KEY_CA = "tkmart_ebooks";
interface EBookCA {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}
function getMyEBooksCA(): EBookCA[] {
  try {
    const ownedIds: string[] = JSON.parse(
      localStorage.getItem(MY_EBOOKS_KEY_CA) ?? "[]",
    );
    const allBooks: EBookCA[] = JSON.parse(
      localStorage.getItem(EBOOKS_KEY_CA) ?? "[]",
    );
    if (allBooks.length === 0) {
      return ownedIds.map((id) => ({
        id,
        title: id.replace("sample-", "Book #"),
        author: "TKMART",
        coverImage: "",
      }));
    }
    return allBooks.filter((b) => ownedIds.includes(b.id));
  } catch {
    return [];
  }
}

export function getSavedAddresses(): SavedAddress[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_ADDRESSES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSavedAddresses(addresses: SavedAddress[]) {
  localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(addresses));
}

const DEFAULT_COORDS = { lat: 13.2240259, lon: 80.2733579 };

async function fetchAddressFromCoords(
  lat: number,
  lon: number,
): Promise<Partial<SavedAddress> | null> {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await resp.json();
    const addr = data.address || {};
    return {
      street:
        addr.road || addr.suburb || addr.neighbourhood || addr.quarter || "",
      city: addr.city || addr.town || addr.village || addr.district || "",
      state: addr.state || "",
      pincode: addr.postcode || "",
      houseName: addr.house_number || addr.building || "",
    };
  } catch {
    return null;
  }
}

// ─── Local Order Type ─────────────────────────────────────────────────────────
interface LocalOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  items: Array<{ name: string; quantity: number }>;
  totalAmount: number;
  paymentMethod: string;
  upiTxId: string;
  status: string;
  verifCode: string;
  createdAt: number;
}

function getStatusClasses(status: string): string {
  if (status === "delivered") return "bg-green-100 text-green-700";
  if (status === "shipped") return "bg-blue-100 text-blue-700";
  if (status === "confirmed") return "bg-yellow-100 text-yellow-700";
  return "bg-gray-100 text-gray-700";
}

export default function CustomerAccountPage() {
  const navigate = useNavigate();
  const session = getCustomerSession();

  const [myOrders] = useState<LocalOrder[]>(() => {
    try {
      const all: LocalOrder[] = JSON.parse(
        localStorage.getItem("tkmart_orders") ?? "[]",
      );
      const phone = session?.phone || "";
      const email = session?.email || "";
      return all.filter(
        (o) =>
          (phone && o.customerPhone?.includes(phone)) ||
          (email && o.customerEmail === email),
      );
    } catch {
      return [];
    }
  });

  const [name, setName] = useState(session?.name || "");
  const [phone, setPhone] = useState(session?.phone || "");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Saved addresses state
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState<Omit<SavedAddress, "id">>({
    label: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [seedingLocation, setSeedingLocation] = useState(false);

  useEffect(() => {
    if (!getCustomerSession()) {
      navigate("/login");
    }
    const saved = localStorage.getItem(`tkmart_address_${session?.email}`);
    if (saved) setAddress(saved);

    const addresses = getSavedAddresses();
    setSavedAddresses(addresses);

    // Pre-populate default coordinates if no saved addresses
    if (addresses.length === 0) {
      setSeedingLocation(true);
      fetchAddressFromCoords(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon).then(
        (resolved) => {
          setSeedingLocation(false);
          if (resolved) {
            const preloaded: SavedAddress = {
              id: `addr_${Date.now()}`,
              label: "My Location",
              houseName: resolved.houseName || "",
              street: resolved.street || "",
              city: resolved.city || "",
              state: resolved.state || "",
              pincode: resolved.pincode || "",
              landmark: "",
            };
            const updated = [preloaded];
            saveSavedAddresses(updated);
            setSavedAddresses(updated);
          }
        },
      );
    }
  }, [navigate, session?.email]);

  const handleSave = () => {
    setIsSaving(true);
    if (session?.email) {
      localStorage.setItem(`tkmart_address_${session.email}`, address);
    }
    const accounts = JSON.parse(
      localStorage.getItem("tkmart_accounts") || "{}",
    );
    if (session?.email && accounts[session.email]) {
      accounts[session.email].name = name;
      accounts[session.email].phone = phone;
      localStorage.setItem("tkmart_accounts", JSON.stringify(accounts));
      localStorage.setItem(
        "tkmart_customer",
        JSON.stringify({ name, email: session.email, phone }),
      );
    }
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile saved successfully!");
    }, 500);
  };

  const handleLogout = () => {
    clearCustomerSession();
    navigate("/");
  };

  const handleAddAddress = () => {
    if (
      !newAddr.street ||
      !newAddr.city ||
      !newAddr.state ||
      !newAddr.pincode
    ) {
      toast.error("Please fill in Street, City, State, and PIN Code.");
      return;
    }
    const addr: SavedAddress = {
      ...newAddr,
      id: `addr_${Date.now()}`,
      label: newAddr.label || `Address ${savedAddresses.length + 1}`,
    };
    const updated = [...savedAddresses, addr];
    saveSavedAddresses(updated);
    setSavedAddresses(updated);
    setNewAddr({
      label: "",
      houseName: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });
    setShowAddForm(false);
    toast.success("Address saved!");
  };

  const handleDeleteAddress = (id: string) => {
    const updated = savedAddresses.filter((a) => a.id !== id);
    saveSavedAddresses(updated);
    setSavedAddresses(updated);
    toast.success("Address removed.");
  };

  if (!session) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10" data-ocid="account.page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">My Account</h1>
          <p className="text-xs text-muted-foreground mt-1">{session.email}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          data-ocid="account.logout.button"
          className="text-destructive border-destructive/30 hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="mb-6" data-ocid="account.profile.card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="acc-name">Full Name</Label>
            <Input
              id="acc-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              data-ocid="account.name.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="acc-phone">Phone Number</Label>
            <Input
              id="acc-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              data-ocid="account.phone.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="acc-address">Delivery Address</Label>
            <Input
              id="acc-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              data-ocid="account.address.input"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            data-ocid="account.profile.save_button"
            className="mt-2"
          >
            {isSaving ? (
              <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* Saved Addresses Card */}
      <Card className="mb-6" data-ocid="account.addresses.section">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              My Addresses
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddForm((v) => !v)}
              data-ocid="account.address.add_button"
              className="gap-1 border-primary/40 hover:border-primary"
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {seedingLocation && (
            <p className="text-xs text-muted-foreground animate-pulse">
              Resolving your saved location...
            </p>
          )}

          {savedAddresses.length === 0 && !seedingLocation && (
            <div
              className="text-center py-6 text-muted-foreground"
              data-ocid="account.addresses.empty_state"
            >
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No saved addresses yet. Add one below.</p>
            </div>
          )}

          {savedAddresses.map((addr, idx) => (
            <div
              key={addr.id}
              className="flex items-start justify-between rounded-lg border border-border p-3 gap-3"
              data-ocid={`account.address.item.${idx + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-primary mb-0.5">
                  {addr.label}
                </p>
                {addr.houseName && (
                  <p className="text-xs text-foreground">{addr.houseName},</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                {addr.landmark && (
                  <p className="text-xs text-muted-foreground">
                    Near: {addr.landmark}
                  </p>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteAddress(addr.id)}
                data-ocid={`account.address.delete_button.${idx + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {showAddForm && (
            <>
              <Separator />
              <div className="space-y-3 pt-1">
                <p className="text-sm font-semibold">New Address</p>
                <div>
                  <Label className="text-xs">Label (e.g. Home, Work)</Label>
                  <Input
                    value={newAddr.label}
                    onChange={(e) =>
                      setNewAddr((p) => ({ ...p, label: e.target.value }))
                    }
                    placeholder="Home"
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">House / Flat / Building</Label>
                  <Input
                    value={newAddr.houseName}
                    onChange={(e) =>
                      setNewAddr((p) => ({ ...p, houseName: e.target.value }))
                    }
                    placeholder="Flat 4B, Sunrise Apartments"
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Street / Area *</Label>
                  <Input
                    value={newAddr.street}
                    onChange={(e) =>
                      setNewAddr((p) => ({ ...p, street: e.target.value }))
                    }
                    placeholder="Anna Nagar, 3rd Cross Street"
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">City *</Label>
                    <Input
                      value={newAddr.city}
                      onChange={(e) =>
                        setNewAddr((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="Chennai"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">State *</Label>
                    <Input
                      value={newAddr.state}
                      onChange={(e) =>
                        setNewAddr((p) => ({ ...p, state: e.target.value }))
                      }
                      placeholder="Tamil Nadu"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">PIN Code *</Label>
                    <Input
                      value={newAddr.pincode}
                      onChange={(e) =>
                        setNewAddr((p) => ({ ...p, pincode: e.target.value }))
                      }
                      placeholder="600040"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Landmark</Label>
                    <Input
                      value={newAddr.landmark}
                      onChange={(e) =>
                        setNewAddr((p) => ({ ...p, landmark: e.target.value }))
                      }
                      placeholder="Near temple"
                      className="mt-1 h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddAddress}
                    className="gap-1"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save Address
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* My E-Books Section */}
      {(() => {
        const myEbooks = getMyEBooksCA();
        if (myEbooks.length === 0) return null;
        return (
          <Card className="mb-6" data-ocid="account.ebooks.card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                My E-Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                data-ocid="account.ebooks.list"
              >
                {myEbooks.map((book, i) => (
                  <Card
                    key={book.id}
                    className="overflow-hidden"
                    data-ocid={`account.ebooks.item.${i + 1}`}
                  >
                    <div className="aspect-[3/4] bg-primary/10 flex items-center justify-center">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="h-8 w-8 text-primary/40" />
                      )}
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs font-semibold line-clamp-2 mb-1">
                        {book.title}
                      </p>
                      <Link to={`/ebooks/read/${book.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full h-7 text-xs"
                          data-ocid={`account.ebooks.read_button.${i + 1}`}
                        >
                          <BookOpen className="h-3 w-3 mr-1" /> Read
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* Orders Card */}
      <Card data-ocid="account.orders.card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5 text-primary" />
            My Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myOrders.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-ocid="account.orders.empty_state"
            >
              <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-foreground mb-1">No orders yet</p>
              <p className="text-sm">Your placed orders will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="account.orders.list">
              {myOrders.map((order, i) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4"
                  data-ocid={`account.orders.item.${i + 1}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-sm">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClasses(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {order.items
                      ?.map((it) => `${it.name} x${it.quantity}`)
                      .join(", ")}
                  </p>
                  <p className="text-sm font-semibold">
                    Total: ₹{(order.totalAmount / 100).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {order.address}
                  </p>
                  {order.verifCode && order.status !== "delivered" && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Delivery Code:
                      </span>
                      <span
                        className="font-mono font-bold text-sm"
                        style={{ color: "oklch(0.78 0.14 85)" }}
                      >
                        {order.verifCode}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
