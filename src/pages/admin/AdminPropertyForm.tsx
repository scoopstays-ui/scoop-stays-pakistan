import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProperty, useCreateProperty, useUpdateProperty } from "@/hooks/useProperties";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft, Loader2, Upload, X, GripVertical, Plus, MapPin,
  Home, Users, Star, Image as ImageIcon, Globe, Info, Bed, Bath,
  Wifi, Car, Utensils, Flame, Mountain, Dumbbell, Shield, Tv,
  Wind, Droplets, TreePine, Coffee, Snowflake, Waves, Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PROPERTY_TYPES = [
  "Apartment", "Villa", "Farmhouse", "Cabin", "Lodge", "Guesthouse",
  "House", "Heritage", "Studio", "Penthouse", "Cottage", "Resort",
];

const PROVINCES = [
  "Punjab", "Sindh", "KPK", "Balochistan", "Gilgit-Baltistan", "AJK", "ICT",
];

const COMMON_AMENITIES = [
  { label: "Wi-Fi", icon: Wifi },
  { label: "Air Conditioning", icon: Snowflake },
  { label: "Parking", icon: Car },
  { label: "Kitchen", icon: Utensils },
  { label: "Fireplace", icon: Flame },
  { label: "Mountain View", icon: Mountain },
  { label: "Gym", icon: Dumbbell },
  { label: "Security", icon: Shield },
  { label: "Smart TV", icon: Tv },
  { label: "Heating", icon: Wind },
  { label: "Hot & Cold Water", icon: Droplets },
  { label: "Garden", icon: TreePine },
  { label: "BBQ", icon: Coffee },
  { label: "Pool", icon: Waves },
  { label: "Sea View", icon: Eye },
];

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
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    type: "",
    description: "",
    airbnb_url: "",
    lat: 0,
    lng: 0,
    google_maps_embed: "",
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

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
        airbnb_url: existingProperty.airbnbUrl || "",
        lat: existingProperty.lat,
        lng: existingProperty.lng,
        google_maps_embed: existingProperty.googleMapsEmbed || "",
      });
      setAmenities(existingProperty.amenities);
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

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (trimmed && !amenities.includes(trimmed)) {
      setAmenities((prev) => [...prev, trimmed]);
      setCustomAmenity("");
    }
  };

  const handleImageUploaded = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const removeImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

  const setMainImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(index, 1);
      updated.unshift(item);
      return updated;
    });
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setImages((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(dragIndex, 1);
      updated.splice(index, 0, item);
      return updated;
    });
    setDragIndex(index);
  };
  const handleDragEnd = () => setDragIndex(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.city || !form.province || !form.price) {
      toast({ title: "Missing fields", description: "Name, city, province and price are required.", variant: "destructive" });
      return;
    }
    if (images.length === 0) {
      toast({ title: "No images", description: "Please upload at least one image.", variant: "destructive" });
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
      images,
      type: form.type,
      amenities,
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
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/properties")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground truncate">
              {isEdit ? "Edit Property" : "Add New Property"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              {isEdit ? "Update the property details below" : "Fill in the details to list a new property"}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="hidden sm:flex">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {isEdit ? "Save Changes" : "Publish Property"}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="details" className="gap-2 text-xs sm:text-sm px-1 sm:px-3"><Info className="w-4 h-4 hidden sm:block" /> Details</TabsTrigger>
            <TabsTrigger value="images" className="gap-2 text-xs sm:text-sm px-1 sm:px-3"><ImageIcon className="w-4 h-4 hidden sm:block" /> Images</TabsTrigger>
            <TabsTrigger value="amenities" className="gap-2 text-xs sm:text-sm px-1 sm:px-3"><Wifi className="w-4 h-4 hidden sm:block" /> Amenities</TabsTrigger>
            <TabsTrigger value="location" className="gap-2 text-xs sm:text-sm px-1 sm:px-3"><MapPin className="w-4 h-4 hidden sm:block" /> Location</TabsTrigger>
          </TabsList>

          {/* ── DETAILS TAB ── */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Home className="w-5 h-5 text-accent" /> Basic Information</CardTitle>
                <CardDescription>Core details about the property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEdit && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Slug / ID (auto-generated if empty)</Label>
                    <Input name="id" value={form.id} onChange={handleChange} placeholder="e.g. my-property-name" className="font-mono text-sm" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Property Name <span className="text-destructive">*</span></Label>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Luxury Villa in Islamabad" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City <span className="text-destructive">*</span></Label>
                    <Input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Murree" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Province <span className="text-destructive">*</span></Label>
                    <Select value={form.province} onValueChange={(v) => setForm((p) => ({ ...p, province: v }))}>
                      <SelectTrigger><SelectValue placeholder="Select province" /></SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Write a detailed description of the property..." />
                  <p className="text-xs text-muted-foreground">{form.description.length} characters</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5 text-accent" /> Pricing & Capacity</CardTitle>
                <CardDescription>Set pricing and guest limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Price (PKR/night) <span className="text-destructive">*</span></Label>
                    <Input name="price" type="number" value={form.price} onChange={handleChange} min={0} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Users className="w-3 h-3" /> Guests</Label>
                    <Input name="guests" type="number" value={form.guests} onChange={handleChange} min={1} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Bed className="w-3 h-3" /> Bedrooms</Label>
                    <Input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} min={0} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Bath className="w-3 h-3" /> Bathrooms</Label>
                    <Input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} min={0} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Star className="w-5 h-5 text-accent" /> Reviews & Rating</CardTitle>
                <CardDescription>Set the current rating and review count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rating (0–5)</Label>
                    <Input name="rating" type="number" step="0.1" min={0} max={5} value={form.rating} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Reviews</Label>
                    <Input name="reviews" type="number" min={0} value={form.reviews} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Globe className="w-5 h-5 text-accent" /> External Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Airbnb URL (optional)</Label>
                  <Input name="airbnb_url" value={form.airbnb_url} onChange={handleChange} placeholder="https://airbnb.com/rooms/..." />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── IMAGES TAB ── */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="w-5 h-5 text-accent" /> Property Images</CardTitle>
                <CardDescription>Upload and arrange images. Drag to reorder — the first image is the cover photo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((img, i) => (
                      <div
                        key={`${img}-${i}`}
                        draggable
                        onDragStart={() => handleDragStart(i)}
                        onDragOver={(e) => handleDragOver(e, i)}
                        onDragEnd={handleDragEnd}
                        className={`relative group rounded-lg border-2 overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
                          i === 0 ? "border-accent ring-2 ring-accent/20" : "border-border"
                        } ${dragIndex === i ? "opacity-50 scale-95" : ""}`}
                      >
                        <div className="aspect-square">
                          <img src={img} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                          <GripVertical className="w-5 h-5 text-white" />
                        </div>
                        {i === 0 && (
                          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            COVER
                          </span>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {i !== 0 && (
                            <button
                              type="button"
                              onClick={() => setMainImage(i)}
                              className="bg-white/90 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white"
                              title="Set as cover"
                            >
                              ★
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center hover:bg-destructive/90"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <span className="text-white text-xs">#{i + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <ImageUploader
                  folder={form.id || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "new-property"}
                  onUpload={handleImageUploaded}
                />

                <p className="text-xs text-muted-foreground">{images.length} image{images.length !== 1 ? "s" : ""} uploaded</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── AMENITIES TAB ── */}
          <TabsContent value="amenities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Wifi className="w-5 h-5 text-accent" /> Amenities</CardTitle>
                <CardDescription>Select available amenities or add custom ones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {COMMON_AMENITIES.map(({ label, icon: Icon }) => {
                    const selected = amenities.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleAmenity(label)}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          selected
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border hover:border-muted-foreground/30 text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Custom Amenities</Label>
                  <div className="flex gap-2">
                    <Input
                      value={customAmenity}
                      onChange={(e) => setCustomAmenity(e.target.value)}
                      placeholder="e.g. Private Chef, Jacuzzi..."
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomAmenity(); } }}
                    />
                    <Button type="button" variant="outline" onClick={addCustomAmenity} disabled={!customAmenity.trim()}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {amenities.length > 0 && (
                  <div>
                    <Label className="mb-2 block">Selected ({amenities.length})</Label>
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((a) => (
                        <Badge key={a} variant="secondary" className="gap-1 pr-1">
                          {a}
                          <button type="button" onClick={() => toggleAmenity(a)} className="ml-1 hover:text-destructive">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── LOCATION TAB ── */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-accent" /> Location</CardTitle>
                <CardDescription>Set coordinates and map embed for the property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Latitude</Label>
                    <Input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} placeholder="e.g. 33.91" />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitude</Label>
                    <Input name="lng" type="number" step="any" value={form.lng} onChange={handleChange} placeholder="e.g. 73.39" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Google Maps Embed URL</Label>
                  <Textarea
                    name="google_maps_embed"
                    value={form.google_maps_embed}
                    onChange={handleChange}
                    rows={3}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  <p className="text-xs text-muted-foreground">Paste the embed URL from Google Maps (Share → Embed a map)</p>
                </div>
                {form.google_maps_embed && (
                  <div className="rounded-lg overflow-hidden border">
                    <iframe
                      src={form.google_maps_embed}
                      className="w-full h-[250px]"
                      allowFullScreen
                      loading="lazy"
                      title="Map Preview"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sticky bottom save button */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border -mx-4 md:-mx-6 px-4 md:px-6 py-4 mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground hidden sm:block">
            {images.length} image{images.length !== 1 ? "s" : ""} • {amenities.length} amenities
          </p>
          <div className="flex gap-3 ml-auto">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/properties")}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {isEdit ? "Save Changes" : "Publish Property"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;
