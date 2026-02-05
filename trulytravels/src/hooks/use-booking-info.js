import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartProduct } from "../redux/features/productSlice";


const useBookingInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const bookingItems = useSelector(selectCartProduct);

  useEffect(() => {
    const booking = bookingItems.reduce((bookingTotal, bookingItem) => {
      const { price, bookingQuantity } = bookingItem;
      const itemTotal = price * bookingQuantity;
      bookingTotal.total += itemTotal
      bookingTotal.quantity += bookingQuantity

      return bookingTotal;
    }, {
      total: 0,
      quantity: 0,
    })
    setQuantity(booking.quantity);
    setTotal(booking.total);
  }, [bookingItems])

  return {
    quantity,
    total,
  }

}

export default useBookingInfo;
