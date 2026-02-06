import React, { useState, useEffect } from 'react';

const Estimator = () => {
  const [destination, setDestination] = useState('India');
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [flightsPerPerson, setFlightsPerPerson] = useState(200);
  const [hotelPerNight, setHotelPerNight] = useState(80);
  const [foodPerDay, setFoodPerDay] = useState(50);
  const [activitiesPerPerson, setActivitiesPerPerson] = useState(100);
  const [taxPercent, setTaxPercent] = useState(10);

  const currency = destination === 'India' ? 'INR' : 'USD';
  const symbol = destination === 'India' ? '₹' : '$';

  // Simulate real-time pricing updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random slight variations to simulate real-time pricing
      setFlightsPerPerson(prev => prev + (Math.random() - 0.5) * 10);
      setHotelPerNight(prev => prev + (Math.random() - 0.5) * 5);
      setFoodPerDay(prev => prev + (Math.random() - 0.5) * 5);
      setActivitiesPerPerson(prev => prev + (Math.random() - 0.5) * 10);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const flightsTotal = flightsPerPerson * travelers;
  const hotelTotal = hotelPerNight * days;
  const foodTotal = foodPerDay * days * travelers;
  const activitiesTotal = activitiesPerPerson * travelers;
  const subtotal = flightsTotal + hotelTotal + foodTotal + activitiesTotal;
  const taxes = (subtotal * taxPercent) / 100;
  const total = subtotal + taxes;

  return (
    <section className="estimate-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section__title text-center mb-40">
              <h2 className="page-title">Travel Cost Estimator</h2>
              <p>Quickly estimate the total cost for a trip.</p>
            </div>
            <div className="estimate-box">
              <div className="row g-3">
                <div className="col-12 mb-3">
                  <label>Destination</label>
                  <select className="form-control" value={destination} onChange={e => setDestination(e.target.value)}>
                    <option value="India">India (INR)</option>
                    <option value="International">International (USD)</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Days</label>
                  <input type="number" className="form-control" value={days} min={1} onChange={e => setDays(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label>Travelers</label>
                  <input type="number" className="form-control" value={travelers} min={1} onChange={e => setTravelers(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label>Hotel per night (total)</label>
                  <input type="number" className="form-control" value={hotelPerNight} min={0} onChange={e => setHotelPerNight(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label>Flights per person</label>
                  <input type="number" className="form-control" value={flightsPerPerson} min={0} onChange={e => setFlightsPerPerson(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label>Food per day per person</label>
                  <input type="number" className="form-control" value={foodPerDay} min={0} onChange={e => setFoodPerDay(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label>Activities per person</label>
                  <input type="number" className="form-control" value={activitiesPerPerson} min={0} onChange={e => setActivitiesPerPerson(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label>Tax / Fees (%)</label>
                  <input type="number" className="form-control" value={taxPercent} min={0} onChange={e => setTaxPercent(Number(e.target.value))} />
                </div>
              </div>

              <div className="estimate-result mt-30">
                <h4>Estimate Breakdown ({currency})</h4>
                <ul>
                  <li>Flights Total: {symbol}{flightsTotal.toFixed(2)}</li>
                  <li>Hotel Total: {symbol}{hotelTotal.toFixed(2)}</li>
                  <li>Food Total: {symbol}{foodTotal.toFixed(2)}</li>
                  <li>Activities Total: {symbol}{activitiesTotal.toFixed(2)}</li>
                  <li>Subtotal: {symbol}{subtotal.toFixed(2)}</li>
                  <li>Taxes ({taxPercent}%): {symbol}{taxes.toFixed(2)}</li>
                </ul>
                <h3 className="mt-3">Estimated Total: {symbol}{total.toFixed(2)}</h3>
                <p className="text-muted">*Prices update in real-time. Actual costs may vary.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estimator;
