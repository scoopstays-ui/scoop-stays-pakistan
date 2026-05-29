import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Activity, LogIn, LogOut, UserPlus, KeyRound, Building2, CalendarCheck, Tag, Settings, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

interface LogRow {
  id: string;
  user_id: string | null;
  user_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  status: string;
  details: Record<string, any>;
  created_at: string;
}

const ACTION_META: Record<string, { label: string; icon: any; color: string }> = {
  login_success: { label: "Login", icon: LogIn, color: "text-green-600" },
  login_failed: { label: "Failed Login", icon: AlertTriangle, color: "text-red-600" },
  signup: { label: "Sign Up", icon: UserPlus, color: "text-blue-600" },
  logout: { label: "Logout", icon: LogOut, color: "text-muted-foreground" },
  password_reset_requested: { label: "Password Reset", icon: KeyRound, color: "text-amber-600" },
  property_created: { label: "Property Created", icon: Building2, color: "text-emerald-600" },
  property_updated: { label: "Property Updated", icon: Building2, color: "text-blue-600" },
  property_deleted: { label: "Property Deleted", icon: Building2, color: "text-red-600" },
  booking_status_updated: { label: "Booking Updated", icon: CalendarCheck, color: "text-purple-600" },
  booking_deleted: { label: "Booking Deleted", icon: CalendarCheck, color: "text-red-600" },
  deals_updated: { label: "Deals Updated", icon: Tag, color: "text-accent" },
  site_setting_updated: { label: "Setting Updated", icon: Settings, color: "text-indigo-600" },
};

const AdminActivity = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["activity_logs"],
    queryFn: async (): Promise<LogRow[]> => {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as LogRow[];
    },
    refetchInterval: 30000,
  });

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      if (filter !== "all" && l.action !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.user_email?.toLowerCase().includes(q) ||
          l.entity_id?.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [logs, search, filter]);

  const actionTypes = useMemo(() => Array.from(new Set(logs.map((l) => l.action))), [logs]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Activity className="w-6 h-6 text-accent" /> Activity Log
        </h2>
        <p className="text-sm text-muted-foreground">
          Audit trail of login attempts and admin actions. Shows latest 500 entries, refreshed every 30s.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search by email, action, or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="All actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            {actionTypes.map((a) => (
              <SelectItem key={a} value={a}>
                {ACTION_META[a]?.label ?? a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <CardDescription>{filtered.length} entries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
          )}
          {!isLoading && filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">No activity found.</p>
          )}
          {filtered.map((l) => {
            const meta = ACTION_META[l.action] ?? { label: l.action, icon: Activity, color: "text-muted-foreground" };
            const Icon = meta.icon;
            const failed = l.status === "failed";
            return (
              <div
                key={l.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
              >
                <div className={`mt-0.5 ${failed ? "text-red-600" : meta.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{meta.label}</span>
                    {failed && <Badge variant="destructive" className="text-[10px]">Failed</Badge>}
                    {l.entity_id && (
                      <Badge variant="outline" className="text-[10px] font-mono">{l.entity_id}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {l.user_email ?? "anonymous"}
                    {l.details && Object.keys(l.details).length > 0 && (
                      <span className="ml-2 opacity-70">
                        {Object.entries(l.details)
                          .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`)
                          .join(" • ")}
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(l.created_at), { addSuffix: true })}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminActivity;