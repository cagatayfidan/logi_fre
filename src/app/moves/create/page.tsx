"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Sofa, Bed, Table, Package, Refrigerator, MoreHorizontal, Upload, X, ImageIcon, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SizeEstimationGuide } from "@/components/size-estimation-guide"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Stepper } from "@/components/stepper"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { cn } from "@/lib/utils"

const steps = [
  { label: "Addresses" },
  { label: "Date" },
  { label: "Items" },
  { label: "Review" },
]

interface FormItem {
  id: string
  name: string
  quantity: number
  weight: number
  fragile: boolean
}

interface FormPhoto {
  id: string
  name: string
  url: string
  file: File
}

const presetItems = [
  { name: "Sofa", icon: Sofa },
  { name: "Bed", icon: Bed },
  { name: "Table", icon: Table },
  { name: "Boxes", icon: Package },
  { name: "Appliance", icon: Refrigerator },
  { name: "Other", icon: MoreHorizontal },
]

export default function CreateMovePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [pickupTimeStart, setPickupTimeStart] = useState("")
  const [pickupTimeEnd, setPickupTimeEnd] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryTimeStart, setDeliveryTimeStart] = useState("")
  const [deliveryTimeEnd, setDeliveryTimeEnd] = useState("")
  const [items, setItems] = useState<FormItem[]>([])
  const [photos, setPhotos] = useState<FormPhoto[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [roomVolume, setRoomVolume] = useState(0)

  function addItem(name: string) {
    setItems([...items, { id: `item-${Date.now()}`, name, quantity: 1, weight: 10, fragile: false }])
  }

  function updateItem(id: string, field: keyof FormItem, value: string | number | boolean) {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  function removeItem(id: string) {
    setItems(items.filter((item) => item.id !== id))
  }

  function handlePhotoFiles(files: FileList) {
    const newPhotos: FormPhoto[] = Array.from(files).map((file) => ({
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }))
    setPhotos([...photos, ...newPhotos])
  }

  function handlePhotoDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) handlePhotoFiles(e.dataTransfer.files)
  }

  function removePhoto(id: string) {
    const photo = photos.find((p) => p.id === id)
    if (photo) URL.revokeObjectURL(photo.url)
    setPhotos(photos.filter((p) => p.id !== id))
  }

  function validateStep(step: number): boolean {
    const newErrors: Record<string, string> = {}
    if (step === 0) {
      if (!origin.trim()) newErrors.origin = "Pickup location is required"
      if (!destination.trim()) newErrors.destination = "Drop-off location is required"
    }
    if (step === 1) {
      if (!pickupDate) newErrors.pickupDate = "Pickup date is required"
      if (!deliveryDate) newErrors.deliveryDate = "Delivery date is required"
    }
    if (step === 2) {
      if (items.length === 0) newErrors.items = "Add at least one item"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 3))
    }
  }

  function handleBack() {
    setCurrentStep(Math.max(currentStep - 1, 0))
    setErrors({})
  }

  function handlePublish() {
    window.location.href = "/dashboard"
  }

  const totalWeight = items.reduce((sum, item) => sum + item.weight * item.quantity, 0)
  const weightVolume = Math.ceil(totalWeight / 30)
  const displayVolume = Math.max(weightVolume, roomVolume)
  const estimatedVolume = `${displayVolume} m³`

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link href="/dashboard" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      <h1 className="mb-6 text-2xl font-bold">Post a Move</h1>

      <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

      <Card>
        {currentStep === 0 && (
          <>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
              <CardDescription>Where are you moving from and to?</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="origin">Pickup Location</FieldLabel>
                  <Input
                    id="origin"
                    placeholder="123 Main St, New York, NY"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                  <FieldError errors={[{ message: errors.origin }]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="destination">Drop-off Location</FieldLabel>
                  <Input
                    id="destination"
                    placeholder="456 Oak Ave, Jersey City, NJ"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <FieldError errors={[{ message: errors.destination }]} />
                </Field>
              </FieldGroup>
            </CardContent>
          </>
        )}

        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle>Date &amp; Time</CardTitle>
              <CardDescription>When do you need to move?</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="pickupDate">Pickup Date</FieldLabel>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                  <FieldError errors={[{ message: errors.pickupDate }]} />
                </Field>
                <Field>
                  <FieldLabel>Pickup Time Window</FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      defaultValue="09:00"
                      value={pickupTimeStart}
                      onChange={(e) => setPickupTimeStart(e.target.value)}
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      defaultValue="12:00"
                      value={pickupTimeEnd}
                      onChange={(e) => setPickupTimeEnd(e.target.value)}
                    />
                  </div>
                </Field>
                <Separator />
                <Field>
                  <FieldLabel htmlFor="deliveryDate">Delivery Date</FieldLabel>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                  <FieldError errors={[{ message: errors.deliveryDate }]} />
                </Field>
                <Field>
                  <FieldLabel>Delivery Time Window</FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      defaultValue="13:00"
                      value={deliveryTimeStart}
                      onChange={(e) => setDeliveryTimeStart(e.target.value)}
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      defaultValue="17:00"
                      value={deliveryTimeEnd}
                      onChange={(e) => setDeliveryTimeEnd(e.target.value)}
                    />
                  </div>
                </Field>
              </FieldGroup>
            </CardContent>
          </>
        )}

        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle>Items to Move</CardTitle>
              <CardDescription>Add items you need to transport</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FieldGroup>
                <div className="flex flex-wrap gap-2">
                  {presetItems.map((preset) => {
                    const Icon = preset.icon
                    return (
                      <Badge
                        key={preset.name}
                        variant="outline"
                        className="flex cursor-pointer gap-1 px-3 py-2 hover:bg-accent"
                        onClick={() => addItem(preset.name)}
                      >
                        <Icon className="size-3.5" />
                        {preset.name}
                      </Badge>
                    )
                  })}
                </div>

                <Button variant="outline" size="sm" onClick={() => addItem("New Item")}>
                  <Plus className="mr-1 size-3.5" data-icon="inline-start" />
                  Add Item
                </Button>

                {items.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <Card key={item.id} className="border border-border">
                        <CardContent className="space-y-3 p-4">
                          <div className="flex items-center justify-between">
                            <Input
                              className="w-40 font-medium"
                              value={item.name}
                              onChange={(e) => updateItem(item.id, "name", e.target.value)}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-muted-foreground">Qty:</Label>
                              <Input
                                type="number"
                                className="w-16"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(item.id, "quantity", Number(e.target.value))
                                }
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-muted-foreground">Weight:</Label>
                              <Input
                                type="number"
                                className="w-20"
                                value={item.weight}
                                onChange={(e) =>
                                  updateItem(item.id, "weight", Number(e.target.value))
                                }
                              />
                              <span className="text-xs text-muted-foreground">kg</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`fragile-${item.id}`}
                                checked={item.fragile}
                                onCheckedChange={(checked) =>
                                  updateItem(item.id, "fragile", checked === true)
                                }
                              />
                              <Label htmlFor={`fragile-${item.id}`} className="text-xs">
                                Fragile
                              </Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Use the presets above or add items manually
                  </p>
                )}
                <FieldError errors={[{ message: errors.items }]} />
              </FieldGroup>

              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Estimated volume: <strong>{estimatedVolume}</strong>
                </p>
                <Dialog>
                  <DialogTrigger render={<Button variant="ghost" size="icon" className="size-6" />}>
                    <Info className="size-4 text-muted-foreground" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogTitle>Size Estimation Guide</DialogTitle>
                    <SizeEstimationGuide
                      currentVolume={displayVolume}
                      onSelect={(v) => setRoomVolume(v)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-sm font-medium">Photo Upload</h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  Add photos of your items to help transporters assess the move
                </p>

                <div
                  className={cn(
                    "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                    dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handlePhotoDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mb-2 size-8 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handlePhotoFiles(e.target.files)
                      e.target.value = ""
                    }}
                  />
                </div>

                {photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="size-full object-cover"
                        />
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="size-3" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 truncate bg-gradient-to-t from-black/60 to-transparent px-1 pb-1 pt-4 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                          {photo.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </>
        )}

        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle>Review Your Move Request</CardTitle>
              <CardDescription>Make sure everything looks right before publishing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">📍 Addresses</p>
                  <p className="text-sm text-muted-foreground">{origin || "Not specified"}</p>
                  <p className="text-sm text-muted-foreground">→ {destination || "Not specified"}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">📅 Schedule</p>
                  <p className="text-sm text-muted-foreground">
                    Pickup: {pickupDate || "TBD"} {pickupTimeStart}-{pickupTimeEnd}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Delivery: {deliveryDate || "TBD"} {deliveryTimeStart}-{deliveryTimeEnd}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">📦 Items ({items.length})</p>
                  {items.map((item) => (
                    <p key={item.id} className="text-sm text-muted-foreground">
                      • {item.name} (x{item.quantity}) - {item.weight * item.quantity}kg
                      {item.fragile ? " 🔸 Fragile" : ""}
                    </p>
                  ))}
                  <p className="mt-1 text-sm text-muted-foreground">
                    Total: {totalWeight}kg / ~{estimatedVolume}
                  </p>
                </div>
                <Separator />
                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <p>
                    ⚠️ By publishing, transporters in your area can view and make offers on your
                    move request.
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter className="justify-between border-t border-border px-6 py-4">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 size-4" data-icon="inline-start" />
              Back
            </Button>
          ) : (
            <div />
          )}
          {currentStep < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePublish}>
                Save as Draft
              </Button>
              <Button onClick={handlePublish}>Publish Move Request</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
