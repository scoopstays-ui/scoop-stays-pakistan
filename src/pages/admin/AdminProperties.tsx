import { useState } from "react";
import { Link } from "react-router-dom";
import { useProperties, useDeleteProperty } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, Search, Loader2, Building2, Star, Users, Bed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProperties = () => {
  const { data: properties = [], isLoading } = useProperties();
  const deleteMutation = useDeleteProperty();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const { toast } = useToast();

  const types = [...new Set(properties.map((p) => p.type))].filter(Boolean).sort();
  const cities = [...new Set(properties.map((p) => p.city))].sort();

  const filtered = properties.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || p.type === typeFilter;
    const matchCity = cityFilter === "all" || p.city === cityFilter;
    return matchSearch && matchType && matchCity;
  });

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "Deleted", description: `${name} has been removed.` });
    } catch {
      toast({ title: "Error", description: "Failed to delete property.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Properties</h2>
          <p className="text-sm text-muted-foreground">{properties.length} total properties • {filtered.length} shown</p>
        </div>
        <Button asChild>
          <Link to="/admin/properties/new"><Plus className="w-4 h-4 mr-2" /> Add Property</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: properties.length, icon: Building2 },
          { label: "Avg Rating", value: properties.length > 0 ? (properties.reduce((s, p) => s + p.rating, 0) / properties.length).toFixed(1) : "0", icon: Star },
          { label: "Avg Price", value: properties.length > 0 ? `PKR ${Math.round(properties.reduce((s, p) => s + p.price, 0) / properties.length).toLocaleString()}` : "0", icon: Building2 },
          { label: "Total Capacity", value: `${properties.reduce((s, p) => s + p.guests, 0)} guests`, icon: Users },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or city..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Cities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-x-auto -mx-4 sm:mx-0 max-w-[100vw]">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Capacity</TableHead>
              <TableHead className="hidden sm:table-cell">Rating</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
                </TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate max-w-[200px]">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.city}, {p.province}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{p.type || "—"}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-3 h-3" /> {p.guests} • <Bed className="w-3 h-3" /> {p.bedrooms}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {p.rating}
                    <span className="text-muted-foreground">({p.reviews})</span>
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">PKR {p.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild title="Preview">
                      <Link to={`/property/${p.id}`} target="_blank"><Eye className="w-4 h-4" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild title="Edit">
                      <Link to={`/admin/properties/edit/${p.id}`}><Pencil className="w-4 h-4" /></Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" title="Delete"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete "{p.name}"?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone. The property and all its data will be permanently removed.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(p.id, p.name)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProperties;
