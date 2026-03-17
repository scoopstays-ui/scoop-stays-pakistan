import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/data/properties";

type DbRow = {
  id: string; name: string; city: string; province: string; price: number;
  rating: number; reviews: number; guests: number; bedrooms: number; bathrooms: number;
  image: string; images: string[]; type: string; amenities: string[];
  description: string; airbnb_url: string | null; lat: number; lng: number;
  google_maps_embed: string | null; created_at: string; updated_at: string;
};

const toFrontend = (p: DbRow): Property => ({
  id: p.id, name: p.name, city: p.city, province: p.province, price: p.price,
  rating: p.rating, reviews: p.reviews, guests: p.guests, bedrooms: p.bedrooms,
  bathrooms: p.bathrooms, image: p.image, images: p.images, type: p.type,
  amenities: p.amenities, description: p.description,
  airbnbUrl: p.airbnb_url ?? undefined, lat: p.lat, lng: p.lng,
  googleMapsEmbed: p.google_maps_embed ?? undefined,
});

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async (): Promise<Property[]> => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as DbRow[]).map(toFrontend);
    },
  });
};

export const useProperty = (id: string | undefined) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async (): Promise<Property | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data ? toFrontend(data as DbRow) : null;
    },
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (property: Record<string, any>) => {
      const { error } = await supabase.from("properties").insert(property as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["properties"] }),
  });
};

export const useUpdateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from("properties").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["properties"] }),
  });
};

export const useDeleteProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["properties"] }),
  });
};

export const uploadPropertyImage = async (file: File, propertyId: string): Promise<string> => {
  const ext = file.name.split(".").pop();
  const path = `${propertyId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("property-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("property-images").getPublicUrl(path);
  return data.publicUrl;
};
