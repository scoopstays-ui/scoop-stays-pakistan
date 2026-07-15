import { useState } from "react";
import { useBookings, useUpdateBookingStatus, useDeleteBooking } from "@/hooks/useBookings";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, Loader2, Calendar, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const AdminBookings = () => {
  const { data: bookings = [], isLoading } = useBookings();
  const updateStatus = useUpdateBookingStatus();
  const deleteMutation = useDeleteBooking();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      b.property_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({ title: "Updated", description: `Booking status changed to ${status}.` });
    } catch {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "Deleted", description: "Booking removed." });
    } catch {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">
        Booking Requests ({bookings.length})
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card overflow-x-auto -mx-4 sm:mx-0 max-w-[100vw]">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="hidden md:table-cell">Dates</TableHead>
              <TableHead className="hidden sm:table-cell">Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-medium flex items-center gap-1">
                      <User className="w-3 h-3 shrink-0" /> <span className="truncate max-w-[140px]">{b.guest_name}</span>
                    </div>
                    {b.phone && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {b.phone}
                      </div>
                    )}
                    {b.email && (
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">{b.email}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[180px] truncate">{b.property_name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {b.check_in && b.check_out ? (
                    <div className="text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(b.check_in), "MMM d")} - {format(new Date(b.check_out), "MMM d")}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not specified</span>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{b.guests}</TableCell>
                <TableCell>
                  <Select value={b.status} onValueChange={(val) => handleStatusChange(b.id, val)}>
                    <SelectTrigger className="h-7 w-[120px]">
                      <Badge variant="outline" className={cn(statusColors[b.status])}>
                        {b.status}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                  {format(new Date(b.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(b.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No booking requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Need cn import
import { cn } from "@/lib/utils";

export default AdminBookings;
