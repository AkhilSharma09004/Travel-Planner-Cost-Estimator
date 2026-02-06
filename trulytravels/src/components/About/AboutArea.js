import React from 'react';

const AboutArea = () => {
    return (
        <>
            <section className="about__area pt-100">
            <div className="container">
               <div className="row">
                  <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1">
                     <div className="about__wrapper">
                        <span className="about__sub-title">About TrulyTravels</span>
                        <h3 className="about__title">We are enabling <br/> Everyone to explore the world.</h3>
                        <div className="about__thumb w-img wow fadeInUp" data-wow-delay=".3s">
                           <img src="assets/img/about/about-1.jpg" alt=""/>
                        </div>
                        <div className="about__count pt-50 pb-15 wow fadeInUp" data-wow-delay=".5s">
                           <div className="row">
                              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                 <div className="about__count-item text-center launche mb-30">
                                    <p>DESTINATIONS</p>
                                    <h4><span className="counter">7000</span>+</h4>
                                 </div>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                 <div className="about__count-item text-center community mb-30">
                                    <p>HAPPY TRAVELERS</p>
                                    <h4><span className="counter">50,000</span>+</h4>
                                 </div>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                 <div className="about__count-item text-center mission mb-30">
                                    <p>CUSTOMER SATISFACTION</p>
                                    <h4><span className="counter">4.9</span>/5</h4>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="about__content">
                           <p className="about__text">{`At TrulyTravels, we believe that every journey begins with a dream. From the bustling streets of Tokyo to the serene beaches of Bali, we connect travelers with unforgettable experiences. Our platform makes it easy to discover, book, and embark on adventures that create lifelong memories. Whether you're planning a family vacation, a solo backpacking trip, or a romantic getaway, we provide personalized recommendations and seamless booking to ensure your travel dreams become reality.`}</p>
                           <p className="about__sub-text">With their diverse backgrounds in travel, hospitality, and technology, our team collaborates to curate exceptional travel experiences. We work tirelessly to connect you with the world's most amazing destinations, ensuring every trip is safe, memorable, and perfectly tailored to your preferences.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        </>
    );
};

export default AboutArea;