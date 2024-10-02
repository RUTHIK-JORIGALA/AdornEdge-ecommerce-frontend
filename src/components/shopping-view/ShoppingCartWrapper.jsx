import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemContent from "./CartItemContent";
import { Button } from "../ui/button";

const ShoppingCartWrapper = ({ cartItems, setopenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:msx-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => 
            // console.log(item.title)
          <CartItemContent cartItem={item} key={item.title} />
        )
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalCartAmount}</span>
        </div>
      </div>
      <Button
      onClick={()=>{
        navigate("/shop/checkout")
        setopenCartSheet(false)
      }}
      className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default ShoppingCartWrapper;
