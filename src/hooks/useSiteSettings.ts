import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activityLog";

export interface HeroSettings {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  whatsappUrl: string;
}

export interface TestimonialItem {
  name: string;
  city: string;
  text: string;
}

export interface CtaSettings {
  title: string;
  description: string;
}

export interface DealItem {
  propertyId: string;
  label: string;
  originalPrice: number;
  discountedPrice: number;
  badge: string;
}

export interface BannerItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
}

const fetchSetting = async <T>(key: string): Promise<T | null> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return data?.value as T ?? null;
};

export const useSiteSetting = <T>(key: string) => {
  return useQuery({
    queryKey: ["site_settings", key],
    queryFn: () => fetchSetting<T>(key),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllSiteSettings = () => {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (error) throw error;
      const map: Record<string, any> = {};
      data?.forEach((row: any) => {
        map[row.key] = row.value;
      });
      return map;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateSiteSetting = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value } as any, { onConflict: "key" });
      if (error) throw error;
      logActivity({
        action: key === "deals" ? "deals_updated" : "site_setting_updated",
        entity_type: "site_setting",
        entity_id: key,
        details: Array.isArray(value) ? { count: value.length } : {},
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    },
  });
};
