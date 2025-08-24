/* ───── src/components/PasswordForm.jsx ───── */
import { useState } from "react";
import zxcvbn from "zxcvbn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";

export default function PasswordForm({ onSave, defaultValues }) {
  const [fields, setFields] = useState(
    defaultValues ?? { site: "", username: "", password: "" }
  );
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ── validation ─────────────────────────── */
  const validate = (f) => {
    const e = {};
    if (!f.site) e.site = "Site URL required";
    if (!f.username) e.username = "Username required";
    if (!f.password) e.password = "Password required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── submit ─────────────────────────────── */
  const handleSubmit = () => {
    if (!validate(fields)) return;
    onSave(fields);
    toast.success("Saved ✨", { transition: Bounce });
    setFields({ site: "", username: "", password: "" });
    setErrors({});
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  /* ── password strength ──────────────────── */
  const { score } = zxcvbn(fields.password);
  const strength = ["Very weak", "Weak", "Fair", "Good", "Strong"][score];
  const barGradient = [
    "from-red-400 to-red-500",
    "from-orange-400 to-orange-500",
    "from-yellow-400 to-yellow-500",
    "from-lime-500 to-green-500",
    "from-emerald-500 to-teal-500",
  ][score];

  return (
    <div
      className="relative rounded-3xl bg-white/40 shadow-2xl ring-1 ring-slate-200/60 
                 backdrop-blur-xl px-8 py-6 sm:px-10 animate-fadeIn
                 border border-white/30"
      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
    >
      {/* glowing border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-2xl -z-10" />

      {/* heading + tick */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-xl font-bold text-slate-800 drop-shadow-sm">
          {defaultValues ? "Edit Entry" : "Add New Password"}
        </h2>
        {saved && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-emerald-600 animate-ping text-xl"
          />
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <FloatingInput
          label="Website URL"
          name="site"
          value={fields.site}
          error={errors.site}
          onChange={setFields}
        />
        <FloatingInput
          label="Username"
          name="username"
          value={fields.username}
          error={errors.username}
          onChange={setFields}
        />

        {/* password field spans 2 cols */}
        <div className="sm:col-span-2">
          <FloatingInput
            label="Password"
            name="password"
            type={showPwd ? "text" : "password"}
            value={fields.password}
            error={errors.password}
            onChange={setFields}
            icon={
              <FontAwesomeIcon
                icon={showPwd ? faEyeSlash : faEye}
                className="cursor-pointer text-slate-500 hover:text-emerald-600 transition-transform duration-300 hover:rotate-12"
                onClick={() => setShowPwd(!showPwd)}
              />
            }
          />

          {/* strength meter */}
          {fields.password && (
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
              <div className="h-2 w-44 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full bg-gradient-to-r ${barGradient} transition-all duration-500 ease-out shadow-md`}
                  style={{ width: `${(score + 1) * 20}%` }}
                ></div>
              </div>
              <span className="font-semibold text-slate-700">{strength}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="group relative mt-8 flex items-center justify-center gap-2 rounded-full 
                   bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-2.5 
                   font-semibold tracking-wide text-white shadow-lg
                   transition-transform hover:scale-105 hover:shadow-emerald-500/40
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
      >
        <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping" />
        {defaultValues ? "Update" : "Add"}
      </button>
    </div>
  );
}

/* ───── fancy floating-label input ───── */
function FloatingInput({ label, name, error, onChange, icon, ...rest }) {
  return (
    <div className={`relative ${error ? "animate-shake" : ""}`}>
      <input
        {...rest}
        id={name}
        className={`peer h-12 w-full rounded-lg border bg-white/60 backdrop-blur-sm px-4 pt-5 text-sm
                    shadow-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/70
                    focus:outline-none placeholder-transparent
                    ${error ? "border-red-500 focus:ring-red-400" : "border-slate-300"}`}
        placeholder=" " 
        onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))}
      />

      {/* floating label */}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500
                   transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-slate-400
                   peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600"
      >
        {label}
      </label>

      {/* right-side icon (eye) */}
      {icon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</span>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500 italic animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}
