import { c as createLucideIcon, r as reactExports, g as createRovingFocusGroupScope, h as useDirection, i as useControllableState, j as jsxRuntimeExports, k as createContextScope, R as Root, P as Primitive, l as useComposedRefs, m as Item, n as composeEventHandlers, o as Presence, p as useSize, q as cn, C as Circle, u as useCart, f as useNavigate, I as Input, B as Button, a as ue } from "./index-CUvGTilV.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DugUs_SA.js";
import { L as Label } from "./label-Bd3-gv2z.js";
import { u as usePrevious } from "./index-DdtVYuCt.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CqQ57IG1.js";
import { S as Separator } from "./separator-B7D_P6au.js";
import { u as useActor } from "./useActor-BYRukwRj.js";
import { g as getSavedAddresses, M as MapPin } from "./CustomerAccountPage-Cna5epcl.js";
import { L as LoaderCircle } from "./loader-circle-34XQKuWb.js";
import "./CustomerLoginPage-Bjvct8pF.js";
import "./shopping-bag-Bl7a3BZF.js";
import "./eye-Ct3xcJKl.js";
import "./log-out-BJW85V2N.js";
import "./plus-T302F43B.js";
import "./trash-2-BXVD2OGh.js";
import "./book-open-Dpldmm9M.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
const ORDER_CODES_KEY = "tkmart_order_codes";
function generateVerifCode() {
  return Math.floor(1e3 + Math.random() * 9e3).toString();
}
function saveOrderCode(orderId, code) {
  try {
    const codes = JSON.parse(localStorage.getItem(ORDER_CODES_KEY) ?? "{}");
    codes[orderId] = code;
    localStorage.setItem(ORDER_CODES_KEY, JSON.stringify(codes));
  } catch {
  }
}
function formatPrice(price) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}
function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { actor } = useActor();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState("address");
  const [loading, setLoading] = reactExports.useState(false);
  const [orderId, setOrderId] = reactExports.useState(null);
  const [verifCode, setVerifCode] = reactExports.useState("");
  const savedAddresses = getSavedAddresses();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    altPhone: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: ""
  });
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  const [locationCoords, setLocationCoords] = reactExports.useState(null);
  const [payment, setPayment] = reactExports.useState("cod");
  const [upiTxId, setUpiTxId] = reactExports.useState("");
  const [deliveryCharge] = reactExports.useState(() => {
    const stored = localStorage.getItem("tkmart_delivery_charge");
    return BigInt(stored ? Number.parseInt(stored, 10) : 0);
  });
  const updateForm = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const handleSelectSavedAddress = (id) => {
    const addr = savedAddresses.find((a) => a.id === id);
    if (!addr) return;
    setForm((prev) => ({
      ...prev,
      houseName: addr.houseName,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      landmark: addr.landmark || ""
    }));
    setLocationCoords(null);
    ue.success(`Address "${addr.label}" applied!`);
  };
  const buildAddress = () => {
    const parts = [
      form.houseName,
      form.street,
      form.city,
      form.state,
      form.pincode,
      form.landmark ? `Landmark: ${form.landmark}` : "",
      locationCoords ? `[Map: ${locationCoords.lat.toFixed(5)},${locationCoords.lng.toFixed(5)}]` : ""
    ].filter(Boolean);
    return parts.join(", ");
  };
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      ue.error("Geolocation is not supported by your browser");
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
            { headers: { "Accept-Language": "en" } }
          );
          const data = await resp.json();
          const addr = data.address || {};
          setForm((prev) => ({
            ...prev,
            city: addr.city || addr.town || addr.village || addr.district || prev.city,
            state: addr.state || prev.state,
            street: addr.road || addr.suburb || addr.neighbourhood || prev.street,
            pincode: addr.postcode || prev.pincode
          }));
          ue.success(
            "Location detected! Please verify and complete your address."
          );
        } catch {
          ue.error("Could not fetch address details. Please fill manually.");
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setLocationLoading(false);
        ue.error(
          err.code === 1 ? "Location permission denied" : "Could not detect location"
        );
      },
      { timeout: 1e4, enableHighAccuracy: true }
    );
  };
  const stepIndex = { address: 0, payment: 1, confirm: 2 };
  async function handlePlaceOrder() {
    if (!actor) return;
    setLoading(true);
    try {
      const paymentMethod = payment === "cod" ? { __kind__: "cod", cod: null } : { __kind__: "upi", upi: { transactionId: upiTxId } };
      const id = await actor.placeOrder(
        form.name,
        form.altPhone ? `${form.phone} / Alt: ${form.altPhone}` : form.phone,
        buildAddress(),
        items.map((i) => ({
          productId: i.productId,
          quantity: BigInt(i.quantity),
          price: i.price
        })),
        total + deliveryCharge,
        paymentMethod
      );
      setOrderId(id);
      const code = generateVerifCode();
      setVerifCode(code);
      saveOrderCode(id.toString(), code);
      clearCart();
      setStep("confirm");
      ue.success("Order placed successfully!");
    } catch (e) {
      ue.error("Failed to place order. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  if (items.length === 0 && step !== "confirm") {
    navigate("/cart");
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-6", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center mb-8", "data-ocid": "checkout.steps.panel", children: ["address", "payment", "confirm"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${stepIndex[step] > i ? "bg-success text-white" : stepIndex[step] === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
          children: stepIndex[step] > i ? "✓" : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `ml-2 text-sm capitalize ${s === step ? "font-semibold" : "text-muted-foreground"}`,
          children: s
        }
      ),
      i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border mx-3" })
    ] }, s)) }),
    step === "address" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "checkout.address.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Delivery Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        savedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            "Choose a Saved Address"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              onValueChange: handleSelectSavedAddress,
              "data-ocid": "checkout.saved_address.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-background",
                    "data-ocid": "checkout.saved_address.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a saved address..." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: savedAddresses.map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: addr.id, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: addr.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-2", children: [
                    "— ",
                    addr.street,
                    ", ",
                    addr.city
                  ] })
                ] }, addr.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: updateForm("name"),
              placeholder: "Your full name",
              className: "mt-1",
              "data-ocid": "checkout.name.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Number *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.phone,
                onChange: updateForm("phone"),
                placeholder: "10-digit phone",
                className: "mt-1",
                "data-ocid": "checkout.phone.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Alternate Phone (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.altPhone,
                onChange: updateForm("altPhone"),
                placeholder: "Alternate phone",
                className: "mt-1",
                "data-ocid": "checkout.altphone.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "w-full border-primary/40 hover:border-primary gap-2",
              onClick: handleUseLocation,
              disabled: locationLoading,
              "data-ocid": "checkout.location.button",
              children: [
                locationLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
                locationLoading ? "Detecting location..." : "Use Current Location"
              ]
            }
          ),
          locationCoords && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-500 mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            " Location detected - fields auto-filled below"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "House / Flat / Building Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.houseName,
              onChange: updateForm("houseName"),
              placeholder: "House no., flat, building name",
              className: "mt-1",
              "data-ocid": "checkout.house.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Street / Area *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.street,
              onChange: updateForm("street"),
              placeholder: "Street, locality, area",
              className: "mt-1",
              "data-ocid": "checkout.street.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.city,
                onChange: updateForm("city"),
                placeholder: "City",
                className: "mt-1",
                "data-ocid": "checkout.city.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "State *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.state,
                onChange: updateForm("state"),
                placeholder: "State",
                className: "mt-1",
                "data-ocid": "checkout.state.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "PIN Code *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.pincode,
                onChange: updateForm("pincode"),
                placeholder: "6-digit PIN",
                className: "mt-1",
                "data-ocid": "checkout.pincode.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Landmark (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.landmark,
                onChange: updateForm("landmark"),
                placeholder: "Near school, temple...",
                className: "mt-1",
                "data-ocid": "checkout.landmark.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full",
            disabled: !form.name || !form.phone || !form.houseName || !form.street || !form.city || !form.state || !form.pincode,
            onClick: () => setStep("payment"),
            "data-ocid": "checkout.address.submit_button",
            children: "Continue to Payment"
          }
        )
      ] })
    ] }),
    step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "checkout.payment.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Payment Method" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          RadioGroup,
          {
            value: payment,
            onValueChange: (v) => setPayment(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 border rounded-lg p-3 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RadioGroupItem,
                  {
                    value: "cod",
                    id: "cod",
                    "data-ocid": "checkout.cod.radio"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cod", className: "cursor-pointer flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Cash on Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pay when you receive your order" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 border rounded-lg p-3 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RadioGroupItem,
                  {
                    value: "upi",
                    id: "upi",
                    "data-ocid": "checkout.upi.radio"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "upi", className: "cursor-pointer flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Manual UPI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Transfer to our UPI ID and enter transaction ID" })
                ] })
              ] })
            ]
          }
        ),
        payment === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-4 space-y-3", children: [
          (() => {
            const qr = localStorage.getItem("tkmart_payment_qr") ?? "";
            const upiId = localStorage.getItem("tkmart_payment_upi_id") ?? "tkmart@upi";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                "Transfer ",
                formatPrice(total + deliveryCharge),
                " to:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: upiId })
              ] }),
              qr && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: qr,
                    alt: "Scan to Pay",
                    className: "w-44 h-44 object-contain bg-white rounded-lg p-2 border"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Scan QR code to pay via UPI" })
              ] })
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "UPI Transaction ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: upiTxId,
                onChange: (e) => setUpiTxId(e.target.value),
                placeholder: "Enter transaction ID after payment",
                className: "mt-1",
                "data-ocid": "checkout.upi_txid.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery Charge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "checkout.delivery_charge.panel", children: deliveryCharge > 0n ? formatPrice(deliveryCharge) : "Free" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total + deliveryCharge) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setStep("address"),
              className: "flex-1",
              "data-ocid": "checkout.back.button",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1",
              disabled: loading || payment === "upi" && !upiTxId,
              onClick: handlePlaceOrder,
              "data-ocid": "checkout.place_order.button",
              children: [
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
                "Place Order"
              ]
            }
          )
        ] })
      ] })
    ] }),
    step === "confirm" && orderId && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center", "data-ocid": "checkout.success.panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-16 w-16 text-success mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Order Placed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-4", children: [
        "Your order ID is",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
          "#",
          orderId.toString()
        ] })
      ] }),
      verifCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mx-auto mb-6 max-w-xs rounded-xl border-2 p-4 text-center",
          style: {
            borderColor: "oklch(0.78 0.14 85)",
            background: "oklch(0.78 0.14 85 / 0.1)"
          },
          "data-ocid": "checkout.verif_code.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "Delivery Verification Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-5xl font-bold font-mono tracking-widest mb-2",
                style: { color: "oklch(0.78 0.14 85)" },
                children: verifCode
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Give this code to the delivery person when your order arrives." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => navigate(`/orders/${orderId}`),
            "data-ocid": "checkout.view_order.button",
            children: "View Order"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => navigate("/track"),
            "data-ocid": "checkout.track.button",
            children: "Track Order"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CheckoutPage as default
};
