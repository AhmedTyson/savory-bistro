import './Reservations.css';
function Reservations() {
  return (
  <div className="min-h-screen py-24 container">
    <h1 className="text-4xl font-bold">Book Your Table</h1>
    <p className="--color-text-body">We can't wait to host you at Savory Bistro!</p>
    <br></br>
    <form>
      <label>Party Size</label>
      <label id='occasiontext'>Occasion</label>
      <br></br>
      <select id='party'>
        <option> 1 Guest</option>
        <option> 2 Guests</option>
        <option> 3 Guests</option>
        <option> 4 Guests</option>
        <option> 5 Guests</option>
        <option> 6 Guests</option>
        <option> 7 Guests</option>
        <option> 8 Guests</option>
        <option> 9 Guests</option>
        <option> 10 Guests</option>
      </select>
      <select id='occasion'>
        <option> Select Occasion (optional)</option>
        <option> Birthday</option>
        <option> Anniversary</option>
        <option> Graduation</option>
        <option> Engagement</option>
      </select>
     </form>
     </div>

  )
}
    



export default Reservations;
