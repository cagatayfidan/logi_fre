"use client"

import { useState } from "react"
import { Sofa, Bed, Table, Package, Home, Building2, Warehouse, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RoomPreset {
  label: string
  icon: typeof Home
  volume: number
  rooms: string
  vehicle: string
}

const roomPresets: RoomPreset[] = [
  { label: "Studio / Dorm", icon: Home, volume: 5, rooms: "1 room", vehicle: "Small van" },
  { label: "1-Bedroom Apt", icon: Building2, volume: 10, rooms: "2-3 rooms", vehicle: "Medium truck" },
  { label: "2-Bedroom Apt", icon: Building2, volume: 20, rooms: "4-5 rooms", vehicle: "Large truck" },
  { label: "3-Bedroom House", icon: Warehouse, volume: 30, rooms: "6-8 rooms", vehicle: "Moving truck" },
  { label: "4+ Bedroom House", icon: Warehouse, volume: 45, rooms: "8+ rooms", vehicle: "Moving truck + trailer" },
]

interface SizeEstimationGuideProps {
  onSelect?: (volume: number) => void
  currentVolume?: number
}

export function SizeEstimationGuide({ onSelect, currentVolume }: SizeEstimationGuideProps) {
  const [selected, setSelected] = useState<number | null>(null)

  function handleSelect(volume: number) {
    setSelected(volume)
    onSelect?.(volume)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Size Estimation Guide</h3>
        <p className="text-xs text-muted-foreground">
          Select the type of home you're moving to get an estimated volume
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {roomPresets.map((preset) => {
          const Icon = preset.icon
          const isSelected = selected === preset.volume
          return (
            <Card
              key={preset.label}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                isSelected && "border-primary bg-primary/5"
              )}
              onClick={() => handleSelect(preset.volume)}
            >
              <CardContent className="flex items-start gap-3 p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{preset.label}</p>
                  <p className="text-xs text-muted-foreground">{preset.rooms}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      ~{preset.volume} m³
                    </Badge>
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Truck className="size-2.5" />
                      {preset.vehicle}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {currentVolume != null && currentVolume > 0 && (
        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-sm font-medium">Estimated Volume: ~{currentVolume} m³</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                currentVolume <= 10 ? "bg-green-500" :
                currentVolume <= 25 ? "bg-amber-500" :
                "bg-destructive"
              )}
              style={{ width: `${Math.min((currentVolume / 50) * 100, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {currentVolume <= 10 ? "✓ Fits in a small van" :
             currentVolume <= 25 ? "✓ Requires a medium-large truck" :
             "⚠ May need a large moving truck"}
          </p>
        </div>
      )}
    </div>
  )
}
