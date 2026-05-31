"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { StarRating } from "@/components/star-rating"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

interface ReceivedReview {
  id: string
  from: string
  rating: number
  comment: string
  reply: string | null
  createdAt: string
}

const mockReceivedReviews: ReceivedReview[] = [
  {
    id: "r1",
    from: "John D.",
    rating: 5,
    comment: "Excellent service, very careful with furniture.",
    reply: null,
    createdAt: "May 15, 2026",
  },
  {
    id: "r2",
    from: "Sarah K.",
    rating: 4,
    comment: "Good overall, slightly late but communicated well.",
    reply: "Thanks for the feedback!",
    createdAt: "May 2, 2026",
  },
  {
    id: "r3",
    from: "Ali M.",
    rating: 4,
    comment: "Professional and efficient.",
    reply: null,
    createdAt: "April 20, 2026",
  },
]

function ReviewCard({ review }: { review: ReceivedReview }) {
  const [reply, setReply] = useState<string | null>(review.reply)
  const [isReplying, setIsReplying] = useState(false)
  const [draftReply, setDraftReply] = useState("")

  function handleSubmitReply() {
    const trimmed = draftReply.trim()
    if (!trimmed) return
    setReply(trimmed)
    setIsReplying(false)
    setDraftReply("")
  }

  function handleCancel() {
    setIsReplying(false)
    setDraftReply("")
  }

  return (
    <Card>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="font-medium text-sm">{review.from}</p>
            <p className="text-xs text-muted-foreground">{review.createdAt}</p>
          </div>
          <StarRating value={review.rating} readonly />
        </div>

        <p className="text-sm text-muted-foreground">{review.comment}</p>

        {reply !== null ? (
          <div className="ml-4 pl-3 border-l-2 border-muted space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">Your reply:</p>
            <p className="text-sm">{reply}</p>
          </div>
        ) : isReplying ? (
          <div className="space-y-2">
            <Textarea
              placeholder="Write your reply..."
              value={draftReply}
              onChange={(e) => setDraftReply(e.target.value.slice(0, 500))}
              rows={3}
              className="resize-none text-sm"
            />
            <p className="text-xs text-muted-foreground text-right">
              {draftReply.length}/500
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSubmitReply}
                disabled={!draftReply.trim()}
              >
                Submit Reply
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsReplying(true)}
          >
            Reply
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
    },
  })

  function onSubmit(_data: ProfileForm) {
    window.location.href = "/dashboard"
  }

  const unrepliedCount = mockReceivedReviews.filter((r) => r.reply === null).length

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10 gap-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Link href="/" className="mb-2 flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Haul</span>
          </Link>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Add your contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" {...register("name")} />
                <FieldError errors={[errors.name]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
                <FieldError errors={[errors.phone]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="address">Address (optional)</FieldLabel>
                <Input id="address" placeholder="123 Main St" {...register("address")} />
              </Field>
              <div className="flex gap-2">
                <Field className="flex-1">
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input id="city" placeholder="New York" {...register("city")} />
                </Field>
                <Field className="w-20">
                  <FieldLabel htmlFor="state">State</FieldLabel>
                  <Input id="state" placeholder="NY" {...register("state")} />
                </Field>
                <Field className="w-24">
                  <FieldLabel htmlFor="zip">Zip</FieldLabel>
                  <Input id="zip" placeholder="10001" {...register("zip")} />
                </Field>
              </div>
              <Button type="submit" className="w-full">
                Save &amp; Continue
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You can skip and edit this later
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Reviews About Me</h2>
          <Badge variant="secondary">{mockReceivedReviews.length}</Badge>
          {unrepliedCount > 0 && (
            <Badge variant="outline" className="text-amber-600 border-amber-400">
              {unrepliedCount} awaiting reply
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {mockReceivedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
