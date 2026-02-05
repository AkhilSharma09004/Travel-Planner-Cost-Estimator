import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleCart from '../../components/Cart/SingleCart';
import Breadcrumb from '../../components/common/Breadcrumb';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import Header from '../../components/Home/Header';
import { addToProduct, clearCart, decreaseCart, getTotal, removeProduct } from '../../redux/features/productSlice';
// import { toast } from 'react-toastify';
import Footer from '../../components/Home/Footer';
import Link from 'next/link';
import Swal from 'sweetalert2';
import BgShape from '../../components/common/BgShape';
import useBookingInfo from '../../hooks/use-booking-info';
import SEO from '../../components/seo';

const ProductBooking = () => {
   const [mountedBooking, setMountedBooking] = useState(false);
   const [errorMsg, setErrorMsg] = useState(false);
   const bookingItem = useSelector((state) => state.products.addToBooking);
   const bookingTotal = useSelector((state) => state.products.bookingTotalAmount);
   const dispatch = useDispatch();
   const { total } = useBookingInfo();

   // bookingItem
   useEffect(() => {
      if (bookingItem.length > 0) {
         setMountedBooking(true);
         setErrorMsg(false);
      }
      if (bookingItem.length === 0) {
         setErrorMsg(true);
         setMountedBooking(false)
      }
   }, [bookingItem, mountedBooking, errorMsg])

   // handleSubmit
   const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Coupon not available this time',
      })
   }
   // handleClearBooking
   const handleClearBooking = () => {
      Swal.fire({
         title: 'Are you sure?',
         text: "Deleted your all booking items",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(clearCart());
            setMountedBooking(false);
            Swal.fire(
               'Deleted!',
               'Your booking items has been deleted.',
               'success'
            )
         }
      })
   }


   // handleDecreaseBooking
   const handleDecreaseBooking = (booking) => {
      dispatch(decreaseCart(booking))
      if (booking.bookingQuantity === 1) {
         setMountedBooking(false)
      }
   }

   // handleIncreaseBooking
   const handleIncreaseBooking = (booking) => {
      dispatch(addToProduct(booking))
   }

   // handle remove product
   const handleRemoveProduct = (id) => {
      dispatch(removeProduct(id));
   }

   return (
      <>
         <SEO pageTitle={'Booking'} />
         <Header />
         <BgShape />
         <Breadcrumb name="Your Booking" title="Booking" />
         {errorMsg && <ErrorMsg />}
         {mountedBooking && <section className="booking-area pb-100">
            <div className="container">
               <div className="row">

                  <div className="col-12">
                     <form onSubmit={handleSubmit}>
                        <div className="table-content table-responsive">
                           <table className="table">
                              <thead>
                                 <tr>
                                    <th className="product-thumbnail">Images</th>
                                    <th className="booking-product-name">Product</th>
                                    <th className="product-price">Unit Price</th>
                                    <th className="product-quantity">Quantity</th>
                                    <th className="product-subtotal">Total</th>
                                    <th className="product-remove">Remove</th>
                                 </tr>
                              </thead>
                              <tbody className='border-0'>
                                 {
                                    bookingItem.map((item, index) => <SingleCart key={index} cart={item}
                                       handleIncreaseCart={handleIncreaseBooking} handleDecreaseCart={handleDecreaseBooking}
                                       handleRemoveProduct={handleRemoveProduct} />)
                                 }

                              </tbody>
                           </table>
                        </div>

                        <div className="row">
                           <div className="col-12">
                              <div className="coupon-all">
                                 <div className="coupon">
                                    <input id="coupon_code" required className="input-text" name="coupon_code" defaultValue="" placeholder="Coupon code" type="text" />
                                    <button className="m-btn m-btn-border-2 cta__btn active" name="apply_coupon" type="submit">Apply coupon</button>
                                 </div>
                                 <div className="coupon2">
                                    <button onClick={handleClearBooking} className="m-btn m-btn-border-2 cta__btn active" name="update_booking" type="button">Clear booking</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="row justify-content-end">
                           <div className="col-md-5">
                              <div className="booking-page-total">
                                 <h2>Booking totals</h2>
                                 <ul className="mb-20">
                                    <li>Subtotal <span>${total}</span></li>
                                    <li>Total <span>${total}</span></li>
                                 </ul>
                                 <Link href="/checkout">
                                    <a className="m-btn m-btn-border-2 cta__btn active">Proceed to checkout</a>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>}

         {/* footer */}
         <Footer />
      </>
   );
};

export default ProductBooking;
