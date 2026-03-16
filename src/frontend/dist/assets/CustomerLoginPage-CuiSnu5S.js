import { c as createLucideIcon, f as useNavigate, r as reactExports, j as jsxRuntimeExports, I as Input, B as Button, a as ue } from "./index-b4x91cWD.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BffBzoTw.js";
import { L as Label } from "./label-DReUsweA.js";
import { S as ShoppingBag } from "./shopping-bag-BCw-Muij.js";
import { E as EyeOff, a as Eye } from "./eye-CDjBtXsV.js";
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const STORAGE_KEY = "tkmart_customer";
function getCustomerSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function clearCustomerSession() {
  localStorage.removeItem(STORAGE_KEY);
}
function CustomerLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleSignup = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      ue.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    const accounts = JSON.parse(
      localStorage.getItem("tkmart_accounts") || "{}"
    );
    if (accounts[email]) {
      ue.error("Account already exists with this email. Please log in.");
      setIsLoading(false);
      return;
    }
    accounts[email] = { name, email, phone, password };
    localStorage.setItem("tkmart_accounts", JSON.stringify(accounts));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, phone }));
    setTimeout(() => {
      setIsLoading(false);
      ue.success("Account created! Welcome to TKMART.");
      navigate("/account");
    }, 600);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      ue.error("Please enter your email and password.");
      return;
    }
    setIsLoading(true);
    const accounts = JSON.parse(
      localStorage.getItem("tkmart_accounts") || "{}"
    );
    const account = accounts[email];
    if (!account || account.password !== password) {
      setTimeout(() => {
        setIsLoading(false);
        ue.error("Invalid email or password.");
      }, 600);
      return;
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: account.name,
        email: account.email,
        phone: account.phone
      })
    );
    setTimeout(() => {
      setIsLoading(false);
      ue.success(`Welcome back, ${account.name}!`);
      navigate("/account");
    }, 600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center bg-background px-4 py-12",
      "data-ocid": "customer_login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-primary text-primary" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-1", children: "TKMART" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Premium Shopping Experience" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/50 shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-7 w-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-lg overflow-hidden border border-border mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: `flex-1 py-2 text-sm font-medium transition-colors ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground"}`,
                    onClick: () => setMode("login"),
                    "data-ocid": "customer_login.login.tab",
                    type: "button",
                    children: "Log In"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: `flex-1 py-2 text-sm font-medium transition-colors ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground"}`,
                    onClick: () => setMode("signup"),
                    "data-ocid": "customer_login.signup.tab",
                    type: "button",
                    children: "Sign Up"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 pb-6", children: [
              mode === "signup" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-name", children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "signup-name",
                      placeholder: "Enter your full name",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      "data-ocid": "customer_login.name.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-email", children: "Email ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "signup-email",
                      type: "email",
                      placeholder: "Enter your email",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      "data-ocid": "customer_login.email.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-phone", children: "Phone Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "signup-phone",
                      type: "tel",
                      placeholder: "Enter your phone number",
                      value: phone,
                      onChange: (e) => setPhone(e.target.value),
                      "data-ocid": "customer_login.phone.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-password", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "signup-password",
                        type: showPassword ? "text" : "password",
                        placeholder: "Create a password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        "data-ocid": "customer_login.password.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                        onClick: () => setShowPassword(!showPassword),
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full h-11 text-sm font-medium mt-2",
                    disabled: isLoading,
                    "data-ocid": "customer_login.signup.submit_button",
                    children: isLoading ? "Creating Account..." : "Create Account"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "login-email",
                      type: "email",
                      placeholder: "Enter your email",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      "data-ocid": "customer_login.login_email.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "login-password",
                        type: showPassword ? "text" : "password",
                        placeholder: "Enter your password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        "data-ocid": "customer_login.login_password.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                        onClick: () => setShowPassword(!showPassword),
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full h-11 text-sm font-medium mt-2",
                    disabled: isLoading,
                    "data-ocid": "customer_login.login.submit_button",
                    children: isLoading ? "Signing in..." : "Log In"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground", children: [
                "Admin?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/admin-login",
                    className: "text-primary hover:underline",
                    "data-ocid": "customer_login.admin.link",
                    children: "Admin Login"
                  }
                )
              ] }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  clearCustomerSession,
  CustomerLoginPage as default,
  getCustomerSession
};
