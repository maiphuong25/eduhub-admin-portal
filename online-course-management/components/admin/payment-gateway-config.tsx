"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const gateways = [
  { id: "vnpay", name: "VNPAY", icon: "🏦", active: true },
  { id: "momo", name: "MoMo", icon: "📱", active: true },
  { id: "stripe", name: "Stripe", icon: "💳", active: false },
  { id: "paypal", name: "PayPal", icon: "🅿️", active: false },
]

export default function PaymentGatewayConfig() {
  const [gatewayCfg, setGatewayCfg] = useState(gateways)
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null)

  const handleToggleGateway = (id: string) => {
    setGatewayCfg(gatewayCfg.map((g) => (g.id === id ? { ...g, active: !g.active } : g)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cấu hình cổng thanh toán</CardTitle>
          <CardDescription>Kết nối và quản lý các cổng thanh toán</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gatewayCfg.map((gateway) => (
              <Card key={gateway.id} className="border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{gateway.icon}</span>
                      <div>
                        <h3 className="font-semibold">{gateway.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {gateway.active ? "Đang hoạt động" : "Chưa kích hoạt"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={gateway.active} onCheckedChange={() => handleToggleGateway(gateway.id)} />
                  </div>
                  {gateway.active && (
                    <div className="space-y-3 border-t pt-4">
                      <Input placeholder={`${gateway.name} API Key`} type="password" />
                      <Input placeholder={`${gateway.name} Secret Key`} type="password" />
                      <Button className="w-full" size="sm">
                        Lưu cấu hình
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
