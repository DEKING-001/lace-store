"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, MapPin } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  total: number;
  created_at: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  orders: number;
  total_spent: number;
  last_order: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then((data) => {
      const orders: Order[] = data.orders || [];
      const customerMap: Record<string, Customer> = {};
      orders.forEach((order) => {
        const key = order.customer_email || order.customer_phone;
        if (!customerMap[key]) {
          customerMap[key] = { name: order.customer_name, email: order.customer_email, phone: order.customer_phone, address: order.customer_address, city: order.customer_city, orders: 0, total_spent: 0, last_order: order.created_at };
        }
        customerMap[key].orders += 1;
        customerMap[key].total_spent += order.total;
        if (new Date(order.created_at) > new Date(customerMap[key].last_order)) customerMap[key].last_order = order.created_at;
      });
      setCustomers(Object.values(customerMap).sort((a, b) => b.orders - a.orders));
      setLoading(false);
    });
  }, []);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  if (loading) return <div className="space-y-6"><div className="h-8 bg-muted rounded w-48 animate-pulse" /><div className="h-64 bg-muted rounded-2xl animate-pulse" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <span className="text-sm text-foreground/50">{customers.length} customer{customers.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-border">
        <input type="text" placeholder="Search by name, email, or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 text-foreground" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-border text-center">
          <Users className="w-12 h-12 text-foreground/20 mx-auto mb-3" />
          <p className="text-foreground/50">{customers.length === 0 ? "No customers yet. Orders will appear here." : "No customers match your search."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((customer) => (
            <div key={customer.email || customer.phone} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{customer.name}</h3>
                  <p className="text-xs text-foreground/50">Last order: {new Date(customer.last_order).toLocaleDateString("en-NG")}</p>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{customer.orders} order{customer.orders !== 1 ? "s" : ""}</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-foreground/60"><Mail className="w-4 h-4" /><span className="truncate">{customer.email}</span></div>
                <div className="flex items-center gap-2 text-foreground/60"><Phone className="w-4 h-4" /><span>{customer.phone}</span></div>
                <div className="flex items-center gap-2 text-foreground/60"><MapPin className="w-4 h-4" /><span className="truncate">{customer.address}, {customer.city}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-foreground/50">Total Spent</span>
                <span className="text-sm font-bold text-primary">₦{customer.total_spent.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
