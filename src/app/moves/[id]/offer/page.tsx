"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { buttonVariants } from "@/components/ui/button"
import { getMoveById } from "@/lib/data"

export default function MakeOfferPage() {
  const params = useParams()
  const move = getMoveById(params.id as string)
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")
  const [insurance, setInsurance] = useState(true)
  const [loadingHelp, setLoadingHelp] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!move) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Move not found</p>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!price || Number(price) <= 0) newErrors.price = "Enter a valid price"
    if (!message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      window.location.href = "/my-offers"
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link
        href={`/moves/${move.id}`}
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Move Detail
      </Link>

      <h1 className="mb-6 text-2xl font-bold">Make an Offer</h1>

      <div className="mb-6 rounded-lg bg-muted p-4">
        <p className="font-medium">{move.title}</p>
        <p className="text-sm text-muted-foreground">
          {move.pickupDate} • {move.items.length} items ({move.totalWeight}kg, {move.estimatedVolume})
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="price">
                  Your Price
                </FieldLabel>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <FieldError errors={[{ message: errors.price }]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">Message to Shipper</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Describe your service, vehicle, and availability..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FieldError errors={[{ message: errors.message }]} />
              </Field>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="insurance"
                    checked={insurance}
                    onCheckedChange={(checked) => setInsurance(checked === true)}
                  />
                  <Label htmlFor="insurance" className="text-sm">
                    Insurance included
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="loadingHelp"
                    checked={loadingHelp}
                    onCheckedChange={(checked) => setLoadingHelp(checked === true)}
                  />
                  <Label htmlFor="loadingHelp" className="text-sm">
                    Loading help included
                  </Label>
                </div>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex-col gap-3 border-t border-border px-6 py-4">
            <p className="w-full text-xs text-muted-foreground">
              Your offer will be visible to the shipper alongside others.
            </p>
            <div className="flex w-full gap-2">
              <Link href={`/moves/${move.id}`} className={buttonVariants({ variant: "outline", size: "default" }) + " flex-1 text-center"}>
                Cancel
              </Link>
              <Button type="submit" className="flex-1">
                Submit Offer
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
