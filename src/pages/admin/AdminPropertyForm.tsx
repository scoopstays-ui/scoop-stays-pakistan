import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProperty, useCreateProperty, useUpdateProperty, uploadPropertyImage } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPropertyForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: existingProperty, isLoading: loadingProperty } = useProperty(id);
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();

  const [form, setForm] = useState({
    id: "",
    name: "",
    city: "",
    province: "",
    price: 0,
    rating: 0,
    reviews: 0,
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    type: "",
    description: "",
    amenities: "",
    airbnb_url: "",
    lat: 0,
    lng: 0,
    google_maps_embed: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingProperty && isEdit) {
      setForm({
        id: existingProperty.id,
        name: existingProperty.name,
        city: existingProperty.city,
        province: existingProperty.province,
        price: existingProperty.price,
        rating: existingProperty.rating,
        reviews: existingProperty.reviews,
        guests: existingProperty.guests,
        bedrooms: existingProperty.bedrooms,
        bathrooms: existingProperty.bathrooms,
        type: existingProperty.type,
        description: existingProperty.description,
        amenities: existingProperty.amenities.join(", "),
        airbnb_url: existingProperty.airbnbUrl || "",
        lat: existingProperty.lat,
        lng: existingProperty.lng,
        google_maps_embed: existingProperty.googleMapsEmbed || "",
      });
      setImages(existingProperty.images);
    }
  }, [existingProperty, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["price", "rating", "reviews", "guests", "bedrooms", "bathrooms", "lat", "lng"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const propId = form.id || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadPropertyImage(file, propId);
        urls.push(url);
      }
      setImages((prev) => [...prev, ...urls]);
    } catch {
      toast({ title: "Upload failed", description: "Could not upload images.", variant: "destructive" });
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.city || !form.province || !form.price) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const slug = form.id || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      id: slug,
      name: form.name,
      city: form.city,
      province: form.province,
      price: form.price,
      rating: form.rating,
      reviews: form.reviews,
      guests: form.guests,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      image: images[0] || "",
      images: images,
      type: form.type,
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      description: form.description,
      airbnb_url: form.airbnb_url || null,
      lat: form.lat,
      lng: form.lng,
      google_maps_embed: form.google_maps_embed || null,
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync(payload);
        toast({ title: "Updated", description: `${form.name} has been updated.` });
      } else {
        await createMutation.mutateAsync(payload);
        toast({ title: "Created", description: `${form.name} has been added.` });
      }
      navigate("/admin/properties");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (isEdit && loadingProperty) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate("/admin/properties")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">{isEdit ? "Edit Property" : "Add New Property"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isEdit && (
                <div className="md:col-span-2 space-y-2">
                  <Label>Slug / ID</Label>
                  <Input name="id" value={form.id} onChange={handleChange} placeholder="auto-generated-from-name" />
                  <p className="text-xs text-muted-foreground">Leave blank to auto-generate from name</p>
                </div>
              )}
              <div className="md:col-span-2 space-y-2">
                <Label>Property Name *</Label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Input name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Province *</Label>
                <Input name="province" value={form.province} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Input name="type" value={form.type} onChange={handleChange} placeholder="Apartment, Villa, Cabin..." />
              </div>
              <div className="space-y-2">
                <Label>Price (PKR/night) *</Label>
                <Input name="price" type="number" value={form.price} onChange={handleChange} required />
              </div>
            </div>

            {/* Capacity */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Guests</Label>
                <Input name="guests" type="number" value={form.guests} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea name="description" value={form.description} onChange={handleChange} rows={4} />
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <Label>Amenities (comma-separated)</Label>
              <Input name="amenities" value={form.amenities} onChange={handleChange} placeholder="WiFi, AC, Kitchen, Parking..." />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input name="lng" type="number" step="any" value={form.lng} onChange={handleChange} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Google Maps Embed URL</Label>
                <Input name="google_maps_embed" value={form.google_maps_embed} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." />
              </div>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <Label>Airbnb URL (optional)</Label>
              <Input name="airbnb_url" value={form.airbnb_url} onChange={handleChange} />
            </div>

            {/* Images */}
            <div className="space-y-4">
              <Label>Images</Label>
              <div className="flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt={`Property ${i + 1}`} className="w-24 h-24 object-cover rounded-lg border" />
                    {i === 0 && <span className="absolute top-1 left-1 bg-accent text-accent-foreground text-[10px] px-1 rounded">Main</span>}
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-4 py-3 hover:bg-muted/50 transition-colors">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span className="text-sm">{uploading ? "Uploading..." : "Upload Images"}</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {isEdit ? "Update Property" : "Create Property"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPropertyForm;
