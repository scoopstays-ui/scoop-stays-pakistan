import { supabase } from "@/integrations/supabase/client";

export type LogAction =
  | "login_success"
  | "login_failed"
  | "signup"
  | "logout"
  | "password_reset_requested"
  | "property_created"
  | "property_updated"
  | "property_deleted"
  | "booking_status_updated"
  | "booking_deleted"
  | "deals_updated"
  | "site_setting_updated";

interface LogPayload {
  action: LogAction;
  entity_type?: string;
  entity_id?: string;
  status?: "success" | "failed";
  details?: Record<string, any>;
  user_email?: string;
}

export const logActivity = async (payload: LogPayload) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("activity_logs").insert({
      user_id: user?.id ?? null,
      user_email: payload.user_email ?? user?.email ?? null,
      action: payload.action,
      entity_type: payload.entity_type ?? null,
      entity_id: payload.entity_id ?? null,
      status: payload.status ?? "success",
      details: payload.details ?? {},
    } as any);
  } catch (err) {
    // Never let logging break the app
    console.warn("activity log failed", err);
  }
};