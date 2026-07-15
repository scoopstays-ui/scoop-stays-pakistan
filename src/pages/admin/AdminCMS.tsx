import { useEffect, useState } from "react";
import { useAllSiteSettings, useUpdateSiteSetting, HeroSettings, StatItem, ContactSettings, TestimonialItem, CtaSettings, DealItem } from "@/hooks/useSiteSettings";
import { useProperties } from "@/hooks/useProperties";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, Plus, Trash2, Image as ImageIcon, Type, Phone, MessageSquare, BarChart3, Quote, Megaphone, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminCMS = () => {
  const { data: settings, isLoading } = useAllSiteSettings();
  const { data: properties = [] } = useProperties();
  const updateMutation = useUpdateSiteSetting();
  const { toast } = useToast();

  // Local state for each section
  const [hero, setHero] = useState<HeroSettings>({ title: "", titleHighlight: "", subtitle: "", description: "", backgroundImage: "" });
  const [stats, setStats] = useState<StatItem[]>([]);
  const [contact, setContact] = useState<ContactSettings>({ phone: "", email: "", address: "", whatsappUrl: "" });
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [cta, setCta] = useState<CtaSettings>({ title: "", description: "" });
  const [deals, setDeals] = useState<DealItem[]>([]);

  useEffect(() => {
    if (!settings) return;
    if (settings.hero) setHero(settings.hero as HeroSettings);
    if (settings.stats) setStats(settings.stats as StatItem[]);
    if (settings.contact) setContact(settings.contact as ContactSettings);
    if (settings.testimonials) setTestimonials(settings.testimonials as TestimonialItem[]);
    if (settings.cta) setCta(settings.cta as CtaSettings);
    if (settings.deals) setDeals(settings.deals as DealItem[]);
  }, [settings]);

  const save = async (key: string, value: any, label: string) => {
    try {
      await updateMutation.mutateAsync({ key, value });
      toast({ title: "Saved!", description: `${label} updated successfully.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Content Manager</h2>
        <p className="text-sm text-muted-foreground">Edit your homepage content, contact info, and more.</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <TabsList className="inline-flex sm:grid sm:w-full sm:grid-cols-6 min-w-max sm:min-w-0">
            <TabsTrigger value="hero" className="gap-1"><Type className="w-3 h-3" /> Hero</TabsTrigger>
            <TabsTrigger value="stats" className="gap-1"><BarChart3 className="w-3 h-3" /> Stats</TabsTrigger>
            <TabsTrigger value="deals" className="gap-1"><Tag className="w-3 h-3" /> Deals</TabsTrigger>
            <TabsTrigger value="contact" className="gap-1"><Phone className="w-3 h-3" /> Contact</TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-1"><Quote className="w-3 h-3" /> Reviews</TabsTrigger>
            <TabsTrigger value="cta" className="gap-1"><Megaphone className="w-3 h-3" /> CTA</TabsTrigger>
          </TabsList>
        </div>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Type className="w-5 h-5 text-accent" /> Hero Section</CardTitle>
              <CardDescription>Edit the main banner text and image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Subtitle (top line)</Label>
                <Input value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} placeholder="Short-Term Rentals in Pakistan" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Main Title</Label>
                  <Input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} placeholder="Find Verified Stays" />
                </div>
                <div className="space-y-2">
                  <Label>Highlighted Text</Label>
                  <Input value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} placeholder="Across Pakistan" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Background Image</Label>
                {hero.backgroundImage && (
                  <img src={hero.backgroundImage} alt="Hero background" className="w-full h-40 object-cover rounded-lg mb-2" />
                )}
                <ImageUploader
                  folder="cms"
                  onUpload={(url) => setHero({ ...hero, backgroundImage: url })}
                />
              </div>
              <Button onClick={() => save("hero", hero, "Hero section")} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-accent" /> Stats Section</CardTitle>
              <CardDescription>Edit the statistics shown on the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-end gap-3">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs">Value</Label>
                    <Input value={stat.value} onChange={(e) => {
                      const updated = [...stats];
                      updated[i] = { ...stat, value: e.target.value };
                      setStats(updated);
                    }} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs">Label</Label>
                    <Input value={stat.label} onChange={(e) => {
                      const updated = [...stats];
                      updated[i] = { ...stat, label: e.target.value };
                      setStats(updated);
                    }} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setStats(stats.filter((_, j) => j !== i))}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setStats([...stats, { value: "", label: "" }])}>
                <Plus className="w-4 h-4 mr-1" /> Add Stat
              </Button>
              <Separator />
              <Button onClick={() => save("stats", stats, "Stats")} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Stats
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Phone className="w-5 h-5 text-accent" /> Contact Information</CardTitle>
              <CardDescription>Update phone, email, address, and WhatsApp link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp URL</Label>
                <Input value={contact.whatsappUrl} onChange={(e) => setContact({ ...contact, whatsappUrl: e.target.value })} placeholder="https://wa.me/923041110786" />
              </div>
              <Button onClick={() => save("contact", contact, "Contact info")} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Contact
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Quote className="w-5 h-5 text-accent" /> Testimonials</CardTitle>
              <CardDescription>Manage guest reviews shown on the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonials.map((t, i) => (
                <div key={i} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Review #{i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => setTestimonials(testimonials.filter((_, j) => j !== i))}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Name</Label>
                      <Input value={t.name} onChange={(e) => {
                        const updated = [...testimonials];
                        updated[i] = { ...t, name: e.target.value };
                        setTestimonials(updated);
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">City</Label>
                      <Input value={t.city} onChange={(e) => {
                        const updated = [...testimonials];
                        updated[i] = { ...t, city: e.target.value };
                        setTestimonials(updated);
                      }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Review Text</Label>
                    <Textarea value={t.text} onChange={(e) => {
                      const updated = [...testimonials];
                      updated[i] = { ...t, text: e.target.value };
                      setTestimonials(updated);
                    }} rows={2} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setTestimonials([...testimonials, { name: "", city: "", text: "" }])}>
                <Plus className="w-4 h-4 mr-1" /> Add Testimonial
              </Button>
              <Separator />
              <Button onClick={() => save("testimonials", testimonials, "Testimonials")} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Testimonials
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deals */}
        <TabsContent value="deals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Tag className="w-5 h-5 text-accent" /> Special Deals & Offers</CardTitle>
              <CardDescription>Manage limited-time deals shown on the homepage. Leave empty to show defaults.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deals.map((deal, i) => (
                <div key={i} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Deal #{i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => setDeals(deals.filter((_, j) => j !== i))}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Property</Label>
                    <Select
                      value={deal.propertyId}
                      onValueChange={(v) => {
                        const updated = [...deals];
                        updated[i] = { ...deal, propertyId: v };
                        setDeals(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name} — {p.city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Deal Label</Label>
                      <Input value={deal.label} onChange={(e) => {
                        const updated = [...deals];
                        updated[i] = { ...deal, label: e.target.value };
                        setDeals(updated);
                      }} placeholder="Weekend Deal in Murree" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Badge</Label>
                      <Input value={deal.badge} onChange={(e) => {
                        const updated = [...deals];
                        updated[i] = { ...deal, badge: e.target.value };
                        setDeals(updated);
                      }} placeholder="27% OFF" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Original Price (PKR)</Label>
                      <Input type="number" value={deal.originalPrice} onChange={(e) => {
                        const updated = [...deals];
                        updated[i] = { ...deal, originalPrice: Number(e.target.value) };
                        setDeals(updated);
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Discounted Price (PKR)</Label>
                      <Input type="number" value={deal.discountedPrice} onChange={(e) => {
                        const updated = [...deals];
                        updated[i] = { ...deal, discountedPrice: Number(e.target.value) };
                        setDeals(updated);
                      }} />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setDeals([...deals, { propertyId: "", label: "", originalPrice: 0, discountedPrice: 0, badge: "" }])}>
                <Plus className="w-4 h-4 mr-1" /> Add Deal
              </Button>
              <Separator />
              <Button onClick={() => save("deals", deals, "Deals")} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Deals
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA */}
        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5 text-accent" /> Call-to-Action Section</CardTitle>
              <CardDescription>Edit the bottom CTA banner text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={cta.title} onChange={(e) => setCta({ ...cta, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={cta.description} onChange={(e) => setCta({ ...cta, description: e.target.value })} rows={2} />
              </div>
              <Button onClick={() => save("cta", cta, "CTA section")} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save CTA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCMS;
