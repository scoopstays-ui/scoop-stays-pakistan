import { Link } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";
import { useBookings } from "@/hooks/useBookings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Star, DollarSign, CalendarCheck, Clock, Plus, ArrowRight, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: properties = [] } = useProperties();
  const { data: bookings = [] } = useBookings();

  const totalProperties = properties.length;
  const avgPrice = totalProperties > 0 ? Math.round(properties.reduce((s, p) => s + p.price, 0) / totalProperties) : 0;
  const avgRating = totalProperties > 0 ? (properties.reduce((s, p) => s + p.rating, 0) / totalProperties).toFixed(1) : "0";
  const uniqueCities = new Set(properties.map((p) => p.city)).size;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const totalBookings = bookings.length;
  const totalCapacity = properties.reduce((s, p) => s + p.guests, 0);

  const stats = [
    { title: "Total Properties", value: totalProperties, icon: Building2, color: "text-blue-600" },
    { title: "Cities Covered", value: uniqueCities, icon: MapPin, color: "text-emerald-600" },
    { title: "Avg Price/Night", value: `PKR ${avgPrice.toLocaleString()}`, icon: DollarSign, color: "text-amber-600" },
    { title: "Avg Rating", value: avgRating, icon: Star, color: "text-yellow-500" },
    { title: "Total Bookings", value: totalBookings, icon: CalendarCheck, color: "text-purple-600" },
    { title: "Pending Requests", value: pendingBookings, icon: Clock, color: "text-orange-500" },
    { title: "Confirmed", value: confirmedBookings, icon: TrendingUp, color: "text-green-600" },
    { title: "Guest Capacity", value: totalCapacity, icon: Users, color: "text-indigo-600" },
  ];

  const recentProperties = [...properties].slice(0, 5);
  const recentBookings = [...bookings].slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>
        <Button asChild>
          <Link to="/admin/properties/new"><Plus className="w-4 h-4 mr-2" /> Add Property</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Recent Properties</CardTitle>
              <CardDescription>Latest listings added</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/properties">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProperties.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No properties yet.</p>}
            {recentProperties.map((p) => (
              <Link key={p.id} to={`/admin/properties/edit/${p.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.city} • PKR {p.price.toLocaleString()}</p>
                </div>
                <Badge variant="outline" className="hidden sm:flex">{p.type}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Recent Bookings</CardTitle>
              <CardDescription>Latest booking requests</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/bookings">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No bookings yet.</p>}
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{b.guest_name}</p>
                  <p className="text-xs text-muted-foreground">{b.property_name}</p>
                </div>
                <Badge variant={b.status === "confirmed" ? "default" : b.status === "pending" ? "secondary" : "outline"}>
                  {b.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
