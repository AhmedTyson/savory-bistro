import { Link } from "react-router-dom";
import "./ReservationHero.css";


function ReservationHero() {
  return (
    <>
      <nav className="res-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="res-breadcrumb__sep">›</span>
        <span className="res-breadcrumb__current">Reservations</span>
      </nav>

      <h1 className="res-title">Book Your Table</h1>
      <p className="res-subtitle">
        We can't wait to host you at Savory Bistro.
      </p>
    </>
  );
}

export default ReservationHero;
