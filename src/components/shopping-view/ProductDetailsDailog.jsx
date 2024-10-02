import React, { useEffect, useState } from "react";
import { DialogContent, Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-select";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import StarRating from "../common/StarRating";

const ProductDetailsDailog = ({ open, setOpen, productDetails }) => {

    const [reviewMsg, setReviewMsg] = useState("")
    const [rating, setRating] = useState(0);
    const {user} = useSelector((state)=> state.auth)
    const {cartItems} = useSelector((state)=> state.shopCart)
    const dispatch = useDispatch();
    
    const {toast } = useToast();

  const handleRatingChange = () => {};

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    let getCartItems = cartItems.items || [];

    if(getCartItems.length){
        const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductId
        )

        if(indexOfCurrentItem > -1){
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if(getQuantity + 1 > getTotalStock){
                toast({
                    title: `Only ${getQuantity} quantity can be added for this item`,
                    variant: "destructive"
                })
                return;
            }
        }
    }
    dispatch(
        addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1
        })
    ).then((data) => {
        if(data?.payload?.success){
            dispatch(fetchCartItems(user?.id));
            toast({
                title: "Product is added to cart"
            })
        }
    })
  };

  const handleDialogClose = () => {
    setOpen(false)
    dispatch(setProductDetails())
    setRating(0)
    setReviewMsg("")
  };

  const handleAddReview = () => {
    
  };

  useEffect(()=>{
    // if(productDetails !== null) dispatch()
  }, [productDetails])

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {/* <StarRating rating={averageReview} /> */}
            </div>
            {/* <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span> */}
          </div>
          <div>
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator/>
          <div className="max-h-[300px] overflow-auto">
            <h2>Reviews</h2>
            {/* <div className="grid gap-6">
                {
                    reviews && reviews.length > 0 ? (
                    reviews.map((reviewItem) => (
                        <div className="flex gap-4" >
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>
                                    {reviewItem?.userName[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">{reviewItem?.userName}</h3>
                                </div>
                                <div className="flex items-center gap-0.5">
                                <StarRating
                                rating={reviewItem?.reviewValue}
                                
                                />
                                </div>
                                <p className="text-muted-foreground">
                                    {reviewItem.reviewMessage}
                                </p>
                            </div>
                        </div>
                    ))
                    ): (<h1>No Reviews</h1>)
                }
            </div> */}
            <div className="mt-10 flex-col flex gap-2">
                <Label>Write a review</Label>
                <div className="flex gap-1">
                    
                    <StarRating
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                    />
                </div>
                <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                />
                <Button
                onClick={handleAddReview}
                disabled = {reviewMsg.trim === ""}
                >
                    Submit
                </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDailog;

