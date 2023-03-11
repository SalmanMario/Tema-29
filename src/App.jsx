import { useState } from "react";
import "./App.css";
import classes from "./styles.module.css";

function App() {
  // Hooks vor fi mereu create la inceput de componenta
  // useState primeste ca prim parametru valoarea initiala pe care o are starea
  // va returna o tupla si vom folosi array destructuring pentru a crea variable
  // de stare. Prima valoare din tupla este starea efectiva (curenta), iar a
  // doua valoare va fi o functie care va modifica starea curenta si va semnala
  // la React ca se intampla o schimbare de UI

  // Contorul pentru butonul de incrementare (initial 0)
  const [contor, setContor] = useState(0);
  // Culoarea de fundal a aplicatiei (initial alb)
  const [color, setColor] = useState("#ffffff");
  // Temperatura introdusa de utilizator (initial 0)
  const [temperatureCelsius, setTemperatureCelsius] = useState(0);
  // Temperatura fahrenheit
  const [temperatureFahrenheit, setTemperatureFahrenheit] = useState(0);
  // Afisarea dropdownului (initial ascuns)
  const [showDropdown, setShowDropdown] = useState(false);
  // produsul afisat pe ecran(Initial POCO X3 cu pretul de 800)
  const [product, setProduct] = useState({
    name: "POCO X3",
    price: 800,
  });

  function handleClick() {
    setContor(contor + 1);
  }

  // Functie ce transforma valoare din fahrenheit in celsius
  function fahrenheitToCelsius(fahrenheit) {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return celsius;
  }

  // Functie ce transforma valoarea din celsius in fahrenheit
  function celsiusToFahrenheit(celsius) {
    const fahrenheit = celsius * 1.8 + 32;
    return fahrenheit;
  }
  // multiply by 1.8 (or 9/5) and add 32.

  // Setare temperatura din Fahrenheit in Celsius
  function handleTemperatureChange(event) {
    const newTemperature = +event.target.value;
    setTemperatureCelsius(newTemperature);
  }

  // Setare temperatura din Celsius in Fahrenheit
  function handleTemperatureFahrenheitToCelsius(event) {
    const fahrenheitToCelsius = +event.target.value;
    setTemperatureFahrenheit(fahrenheitToCelsius);
  }

  function handleColorChange(event) {
    // Extragem valoarea din color input, pe care utilizatorul o introduce
    const newColor = event.target.value;
    // Pentru a reflecta in interfata ca avem o culoare noua,
    // folosim setColor cu valoarea noua
    // Astfel, componenta se rerandeaza (reafiseaza)
    setColor(newColor);
  }

  function handlePriceChange() {
    // genereaza un pret aleator nou intre 600 si 1000
    const newPrice = Math.floor(Math.random() * 400 + 600);

    const newProduct = {
      ...product,
      price: newPrice,
    };

    setProduct(newProduct);

    // ([0, 1)*400) + 600 ( [600,1000) )

    // [600,1000)

    // va seta proprietatea `price` la valoarea noua
  }

  function handleToggleDropdown() {
    // daca e ascuns sa il arate
    // daca este afisat, sa il ascunda
    // daca dropdown este true
    // if (showDropdown) {
    //   setShowDropdown(false);
    // } else {
    //   setShowDropdown(true);
    // }
    // varianta okay ...
    setShowDropdown(!showDropdown);

    // dar varianta 100% corecta ar fi urmatoarea

    // SetShowDropdown cu un callback function, va primi ca state valoarea curenta
    // setShowDropdown((showDropdown) => {
    //   return !showDropdown;
    // });
  }

  let dropdownClasses = "dropdown-list";
  if (showDropdown) {
    dropdownClasses += " is-displayed";
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: color,
      }}
    >
      <input type="color" value={color} onChange={handleColorChange} />
      <h1 className={classes.title}>My App</h1>

      <div>
        <button onClick={handleToggleDropdown}>{showDropdown ? "Hide Dropdown" : "Show Dropdown"}</button>
        <p>Folosind operatorul ternar</p>
        {showDropdown ? (
          <ul className={dropdownClasses}>
            <li>Optiune 1</li>
            <li>Optiune 2</li>
          </ul>
        ) : null}
        <p>Folosind clase CSS</p>

        <ul className={dropdownClasses}>
          <li>Optiune 1</li>
          <li>Optiune 2</li>
        </ul>
      </div>

      <label>Temperatura in Celsius</label>
      <input type="number" value={temperatureCelsius} onChange={handleTemperatureChange} />
      <div>Temperatura in Fahrenheit {celsiusToFahrenheit(temperatureCelsius)}</div>
      <button onClick={handleClick}>Contor {contor}</button>

      <br />

      <label>Temperatura in Fahrenheit</label>
      <input type="number" value={temperatureFahrenheit} onChange={handleTemperatureFahrenheitToCelsius} />
      <div>Temperatura in Celsius {fahrenheitToCelsius(temperatureFahrenheit)}</div>

      <h2>{product.name}</h2>

      <p>Pret: {product.price}</p>

      <button onClick={handlePriceChange}>Schimba pretul</button>
    </div>
  );
}

export default App;
