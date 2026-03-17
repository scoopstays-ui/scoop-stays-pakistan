import { useProperties } from "@/hooks/useProperties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Star, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const { data: properties = [] } = useProperties();

  const totalProperties = properties.length;
  const avgPrice = totalProperties > 0 ? Math.round(properties.reduce((s, p) => s + p.price, 0) / totalProperties) : 0;
  const avgRating = totalProperties > 0 ? (properties.reduce((s, p) => s + p.rating, 0) / totalProperties).toFixed(1) : "0";
  const uniqueCities = new Set(properties.map((p) => p.city)).size;

  const stats = [
    { title: "Total Properties", value: totalProperties, icon: Building2 },
    { title: "Cities", value: uniqueCities, icon: MapPin },
    { title: "Avg Price/Night", value: `PKR ${avgPrice.toLocaleString()}`, icon: DollarSign },
    { title: "Avg Rating", value: avgRating, icon: Star },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
