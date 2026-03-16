import { c as createLucideIcon, f as useNavigate, r as reactExports, j as jsxRuntimeExports, I as Input, B as Button, a as ue } from "./index-b4x91cWD.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BffBzoTw.js";
import { L as Label } from "./label-DReUsweA.js";
import { E as EyeOff, a as Eye } from "./eye-CDjBtXsV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const ADMIN_USERNAME = "ashwin29072009";
const ADMIN_PASSWORD = "tkmart29072009";
const ADMIN_SESSION_KEY = "tkmart_admin_session";
function getAdminSession() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}
function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      ue.error("Please enter username and password.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(ADMIN_SESSION_KEY, "true");
        ue.success("Welcome, Admin!");
        navigate("/admin");
      } else {
        ue.error("Invalid username or password.");
      }
      setIsLoading(false);
    }, 600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center bg-background px-4",
      "data-ocid": "admin_login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-2xl", children: "Admin Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "TKMART Administration" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "admin-username", children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "admin-username",
                placeholder: "Enter admin username",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                autoComplete: "username",
                "data-ocid": "admin_login.username.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "admin-password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "admin-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "Enter admin password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  autoComplete: "current-password",
                  "data-ocid": "admin_login.password.input"
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
              className: "w-full mt-2",
              disabled: isLoading,
              "data-ocid": "admin_login.login.button",
              children: isLoading ? "Signing in..." : "Sign In"
            }
          )
        ] }) })
      ] })
    }
  );
}
export {
  clearAdminSession,
  AdminLoginPage as default,
  getAdminSession
};
