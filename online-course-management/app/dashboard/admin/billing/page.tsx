"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicIcons } from "@/components/icons/basic-icons"
import PricingManagement from "@/components/admin/pricing-management"
import CouponManagement from "@/components/admin/coupon-management"
import PaymentHistory from "@/components/admin/payment-history"
import PaymentGatewayConfig from "@/components/admin/payment-gateway-config"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("pricing")

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Thanh toán & Billing</h1>
          <p className="text-muted-foreground">Quản lý giá, coupon, thanh toán và cổng thanh toán</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              {BasicIcons.settings}
              <span className="hidden sm:inline">Giá khóa học</span>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              {BasicIcons.discount}
              <span className="hidden sm:inline">Coupon/Promo</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              {BasicIcons.history}
              <span className="hidden sm:inline">Lịch sử</span>
            </TabsTrigger>
            <TabsTrigger value="gateways" className="flex items-center gap-2">
              {BasicIcons.settings}
              <span className="hidden sm:inline">Cổng TT</span>
            </TabsTrigger>
          </TabsList>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <PricingManagement />
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons">
            <CouponManagement />
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history">
            <PaymentHistory />
          </TabsContent>

          {/* Payment Gateways Tab */}
          <TabsContent value="gateways">
            <PaymentGatewayConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
