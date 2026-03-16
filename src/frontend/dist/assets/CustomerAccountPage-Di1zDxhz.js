import { c as createLucideIcon, f as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, ag as User, I as Input, L as Link, s as Package, a as ue } from "./index-b4x91cWD.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BffBzoTw.js";
import { L as Label } from "./label-DReUsweA.js";
import { S as Separator } from "./separator-tcSIh0gk.js";
import { getCustomerSession, clearCustomerSession } from "./CustomerLoginPage-CuiSnu5S.js";
import { L as LogOut } from "./log-out-Bw9p3-q1.js";
import { P as Plus } from "./plus-CTlbtscY.js";
import { T as Trash2 } from "./trash-2-KUTeqwrE.js";
import { B as BookOpen } from "./book-open-BxUJEssB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const SAVED_ADDRESSES_KEY = "tkmart_saved_addresses";
const MY_EBOOKS_KEY_CA = "tkmart_my_ebooks";
const EBOOKS_KEY_CA = "tkmart_ebooks";
function getMyEBooksCA() {
  try {
    const ownedIds = JSON.parse(
      localStorage.getItem(MY_EBOOKS_KEY_CA) ?? "[]"
    );
    const allBooks = JSON.parse(
      localStorage.getItem(EBOOKS_KEY_CA) ?? "[]"
    );
    if (allBooks.length === 0) {
      return ownedIds.map((id) => ({
        id,
        title: id.replace("sample-", "Book #"),
        author: "TKMART",
        coverImage: ""
      }));
    }
    return allBooks.filter((b) => ownedIds.includes(b.id));
  } catch {
    return [];
  }
}
function getSavedAddresses() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_ADDRESSES_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveSavedAddresses(addresses) {
  localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(addresses));
}
const DEFAULT_COORDS = { lat: 13.2240259, lon: 80.2733579 };
async function fetchAddressFromCoords(lat, lon) {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await resp.json();
    const addr = data.address || {};
    return {
      street: addr.road || addr.suburb || addr.neighbourhood || addr.quarter || "",
      city: addr.city || addr.town || addr.village || addr.district || "",
      state: addr.state || "",
      pincode: addr.postcode || "",
      houseName: addr.house_number || addr.building || ""
    };
  } catch {
    return null;
  }
}
function CustomerAccountPage() {
  const navigate = useNavigate();
  const session = getCustomerSession();
  const [name, setName] = reactExports.useState((session == null ? void 0 : session.name) || "");
  const [phone, setPhone] = reactExports.useState((session == null ? void 0 : session.phone) || "");
  const [address, setAddress] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [savedAddresses, setSavedAddresses] = reactExports.useState([]);
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [newAddr, setNewAddr] = reactExports.useState({
    label: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: ""
  });
  const [seedingLocation, setSeedingLocation] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!getCustomerSession()) {
      navigate("/login");
    }
    const saved = localStorage.getItem(`tkmart_address_${session == null ? void 0 : session.email}`);
    if (saved) setAddress(saved);
    const addresses = getSavedAddresses();
    setSavedAddresses(addresses);
    if (addresses.length === 0) {
      setSeedingLocation(true);
      fetchAddressFromCoords(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon).then(
        (resolved) => {
          setSeedingLocation(false);
          if (resolved) {
            const preloaded = {
              id: `addr_${Date.now()}`,
              label: "My Location",
              houseName: resolved.houseName || "",
              street: resolved.street || "",
              city: resolved.city || "",
              state: resolved.state || "",
              pincode: resolved.pincode || "",
              landmark: ""
            };
            const updated = [preloaded];
            saveSavedAddresses(updated);
            setSavedAddresses(updated);
          }
        }
      );
    }
  }, [navigate, session == null ? void 0 : session.email]);
  const handleSave = () => {
    setIsSaving(true);
    if (session == null ? void 0 : session.email) {
      localStorage.setItem(`tkmart_address_${session.email}`, address);
    }
    const accounts = JSON.parse(
      localStorage.getItem("tkmart_accounts") || "{}"
    );
    if ((session == null ? void 0 : session.email) && accounts[session.email]) {
      accounts[session.email].name = name;
      accounts[session.email].phone = phone;
      localStorage.setItem("tkmart_accounts", JSON.stringify(accounts));
      localStorage.setItem(
        "tkmart_customer",
        JSON.stringify({ name, email: session.email, phone })
      );
    }
    setTimeout(() => {
      setIsSaving(false);
      ue.success("Profile saved successfully!");
    }, 500);
  };
  const handleLogout = () => {
    clearCustomerSession();
    navigate("/");
  };
  const handleAddAddress = () => {
    if (!newAddr.street || !newAddr.city || !newAddr.state || !newAddr.pincode) {
      ue.error("Please fill in Street, City, State, and PIN Code.");
      return;
    }
    const addr = {
      ...newAddr,
      id: `addr_${Date.now()}`,
      label: newAddr.label || `Address ${savedAddresses.length + 1}`
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
      landmark: ""
    });
    setShowAddForm(false);
    ue.success("Address saved!");
  };
  const handleDeleteAddress = (id) => {
    const updated = savedAddresses.filter((a) => a.id !== id);
    saveSavedAddresses(updated);
    setSavedAddresses(updated);
    ue.success("Address removed.");
  };
  if (!session) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10", "data-ocid": "account.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "My Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: session.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleLogout,
          "data-ocid": "account.logout.button",
          className: "text-destructive border-destructive/30 hover:bg-destructive/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2" }),
            "Log out"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", "data-ocid": "account.profile.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary" }),
        "Profile Information"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "acc-name", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "acc-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Enter your full name",
              "data-ocid": "account.name.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "acc-phone", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "acc-phone",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "Enter your phone number",
              "data-ocid": "account.phone.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "acc-address", children: "Delivery Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "acc-address",
              value: address,
              onChange: (e) => setAddress(e.target.value),
              placeholder: "Enter your delivery address",
              "data-ocid": "account.address.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSave,
            disabled: isSaving,
            "data-ocid": "account.profile.save_button",
            className: "mt-2",
            children: [
              isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
              isSaving ? "Saving..." : "Save Profile"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", "data-ocid": "account.addresses.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
          "My Addresses"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setShowAddForm((v) => !v),
            "data-ocid": "account.address.add_button",
            className: "gap-1 border-primary/40 hover:border-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add New"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        seedingLocation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground animate-pulse", children: "Resolving your saved location..." }),
        savedAddresses.length === 0 && !seedingLocation && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-6 text-muted-foreground",
            "data-ocid": "account.addresses.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No saved addresses yet. Add one below." })
            ]
          }
        ),
        savedAddresses.map((addr, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start justify-between rounded-lg border border-border p-3 gap-3",
            "data-ocid": `account.address.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-primary mb-0.5", children: addr.label }),
                addr.houseName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground", children: [
                  addr.houseName,
                  ","
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  addr.street,
                  ", ",
                  addr.city,
                  ", ",
                  addr.state,
                  " - ",
                  addr.pincode
                ] }),
                addr.landmark && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Near: ",
                  addr.landmark
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "shrink-0 text-destructive hover:bg-destructive/10",
                  onClick: () => handleDeleteAddress(addr.id),
                  "data-ocid": `account.address.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ]
          },
          addr.id
        )),
        showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "New Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Label (e.g. Home, Work)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: newAddr.label,
                  onChange: (e) => setNewAddr((p) => ({ ...p, label: e.target.value })),
                  placeholder: "Home",
                  className: "mt-1 h-8 text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "House / Flat / Building" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: newAddr.houseName,
                  onChange: (e) => setNewAddr((p) => ({ ...p, houseName: e.target.value })),
                  placeholder: "Flat 4B, Sunrise Apartments",
                  className: "mt-1 h-8 text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Street / Area *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: newAddr.street,
                  onChange: (e) => setNewAddr((p) => ({ ...p, street: e.target.value })),
                  placeholder: "Anna Nagar, 3rd Cross Street",
                  className: "mt-1 h-8 text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "City *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newAddr.city,
                    onChange: (e) => setNewAddr((p) => ({ ...p, city: e.target.value })),
                    placeholder: "Chennai",
                    className: "mt-1 h-8 text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "State *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newAddr.state,
                    onChange: (e) => setNewAddr((p) => ({ ...p, state: e.target.value })),
                    placeholder: "Tamil Nadu",
                    className: "mt-1 h-8 text-sm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "PIN Code *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newAddr.pincode,
                    onChange: (e) => setNewAddr((p) => ({ ...p, pincode: e.target.value })),
                    placeholder: "600040",
                    className: "mt-1 h-8 text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Landmark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newAddr.landmark,
                    onChange: (e) => setNewAddr((p) => ({ ...p, landmark: e.target.value })),
                    placeholder: "Near temple",
                    className: "mt-1 h-8 text-sm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: handleAddAddress,
                  className: "gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                    "Save Address"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => setShowAddForm(false),
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    (() => {
      const myEbooks = getMyEBooksCA();
      if (myEbooks.length === 0) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", "data-ocid": "account.ebooks.card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }),
          "My E-Books"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
            "data-ocid": "account.ebooks.list",
            children: myEbooks.map((book, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "overflow-hidden",
                "data-ocid": `account.ebooks.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-primary/10 flex items-center justify-center", children: book.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: book.coverImage,
                      alt: book.title,
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-primary/40" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold line-clamp-2 mb-1", children: book.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/ebooks/read/${book.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "w-full h-7 text-xs",
                        "data-ocid": `account.ebooks.read_button.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3 mr-1" }),
                          " Read"
                        ]
                      }
                    ) })
                  ] })
                ]
              },
              book.id
            ))
          }
        ) })
      ] });
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "account.orders.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-primary" }),
        "My Orders"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-8 text-muted-foreground",
          "data-ocid": "account.orders.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "Track your orders easily" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", children: "Use the Track Order page to check your order status." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/track", "data-ocid": "account.track.link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Track Order" }) })
          ]
        }
      ) })
    ] })
  ] });
}
const CustomerAccountPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CustomerAccountPage,
  getSavedAddresses
}, Symbol.toStringTag, { value: "Module" }));
export {
  CustomerAccountPage$1 as C,
  MapPin as M,
  getSavedAddresses as g
};
