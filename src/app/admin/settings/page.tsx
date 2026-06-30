"use client";

import { useState, useEffect } from "react";
import { Save, Store, CreditCard, Truck, Lock } from "lucide-react";

interface StoreSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;
  bank_name: string;
  bank_account: string;
  bank_account_name: string;
  shipping_fee: number;
  free_shipping_min: number;
}

const DEFAULT_SETTINGS: StoreSettings = {
  store_name: "Aba Premium Net Fabrics",
  store_email: "adighibechukwuma2021@gmail.com",
  store_phone: "09038171393",
  store_address: "Aba, Nigeria",
  bank_name: "",
  bank_account: "",
  bank_account_name: "",
  shipping_fee: 2000,
  free_shipping_min: 50000,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("store_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    localStorage.setItem("store_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = (field: keyof StoreSettings, value: string | number) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="h-96 bg-muted rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Store Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200">
          Settings saved successfully!
        </div>
      )}

      {/* Store Info */}
      <div className="bg-white p-6 rounded-2xl border border-border">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Store className="w-5 h-5 text-primary" />
          Store Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Store Name
            </label>
            <input
              type="text"
              value={settings.store_name}
              onChange={(e) => updateField("store_name", e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.store_email}
                onChange={(e) => updateField("store_email", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={settings.store_phone}
                onChange={(e) => updateField("store_phone", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Address
            </label>
            <input
              type="text"
              value={settings.store_address}
              onChange={(e) => updateField("store_address", e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white p-6 rounded-2xl border border-border">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Bank Details (for Transfer)
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={settings.bank_name}
                onChange={(e) => updateField("bank_name", e.target.value)}
                placeholder="e.g. GTBank, Access Bank"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={settings.bank_account}
                onChange={(e) => updateField("bank_account", e.target.value)}
                placeholder="0123456789"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Account Name
            </label>
            <input
              type="text"
              value={settings.bank_account_name}
              onChange={(e) => updateField("bank_account_name", e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white p-6 rounded-2xl border border-border">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          Shipping
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Shipping Fee (₦)
            </label>
            <input
              type="number"
              value={settings.shipping_fee}
              onChange={(e) => updateField("shipping_fee", Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Free Shipping Min (₦)
            </label>
            <input
              type="number"
              value={settings.free_shipping_min}
              onChange={(e) => updateField("free_shipping_min", Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>
      {/* Password */}
      <div className="bg-white p-6 rounded-2xl border border-border">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Change Password
        </h2>
        <div className="space-y-4 max-w-md">
          {passwordMsg && (
            <div className={`text-sm px-4 py-3 rounded-xl border ${passwordMsg.includes("Success") ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
              {passwordMsg}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwords.newPass}
              onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <button
            onClick={() => {
              const current = localStorage.getItem("admin_password") || "abafabrics2024";
              if (passwords.current !== current) {
                setPasswordMsg("Current password is incorrect");
                return;
              }
              if (passwords.newPass.length < 6) {
                setPasswordMsg("New password must be at least 6 characters");
                return;
              }
              if (passwords.newPass !== passwords.confirm) {
                setPasswordMsg("New passwords do not match");
                return;
              }
              localStorage.setItem("admin_password", passwords.newPass);
              setPasswordMsg("Success! Password changed. Use new password next login.");
              setPasswords({ current: "", newPass: "", confirm: "" });
            }}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
