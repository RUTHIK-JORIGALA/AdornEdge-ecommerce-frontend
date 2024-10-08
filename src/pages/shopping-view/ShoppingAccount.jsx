import Address from '@/components/shopping-view/Address'
import ShoppingOrders from '@/components/shopping-view/ShoppingOrders'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden bg-red-300'>
        {/* <img src="" alt="" /> */}
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue='address'>
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value="address">
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
