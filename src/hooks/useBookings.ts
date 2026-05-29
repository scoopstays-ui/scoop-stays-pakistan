import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activityLog";

export interface Booking {
  id: string;
  property_id: string | null;
  property_name: string;
  guest_name: string;
  phone: string | null;
  email: string | null;
  check_in: string | null;
  check_out: string | null;
  guests: number;
  message: string | null;
  status: string;
  created_at: string;
}

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async (): Promise<Booking[]> => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Booking[];
    },
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (booking: {
      property_id?: string;
      property_name: string;
      guest_name: string;
      phone?: string;
      email?: string;
      check_in?: string;
      check_out?: string;
      guests: number;
      message?: string;
    }) => {
      const { error } = await supabase.from("bookings").insert(booking as any);
      if (error) throw error;
    },
  });
};

export const useUpdateBookingStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status } as any)
        .eq("id", id);
      if (error) throw error;
      logActivity({
        action: "booking_status_updated",
        entity_type: "booking",
        entity_id: id,
        details: { status },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useDeleteBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      logActivity({
        action: "booking_deleted",
        entity_type: "booking",
        entity_id: id,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};
