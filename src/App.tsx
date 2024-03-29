import React from "react";
import "./Styles/App.css";

// Error Handling components
import Alert from "react-bootstrap/Alert";

// Components
import NavbarMain from "./Components/navbar";

function App() {
  const [canSearch, setCanSearch] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Error handling
  const [show, setShow] = React.useState(false);

  // Data from the API
  const [data, setData] = React.useState<any>();

  // Calling the API and setting the state
  function handleClick() {
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${inputRef.current?.value}&key=${process.env.REACT_APP_WEATHER_API_KEY}&units=I`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setShowResults(true);
      })
      .catch((err) => {
        setShow(true);
        console.log(err);
      });
  }

  return (
    <div>
      <NavbarMain />
      <div className="App">
        <header className="App-header">
          <h2 style={{ paddingBottom: "60px" }}>
            Search any City for a current weather report
          </h2>
          <div className="Seach-bar">
            <input
              style={{
                backgroundColor: "white",
                border: "15px",
                color: "black",
                fontSize: "23px",
                fontWeight: "bold",
                height: "55px",
                borderRadius: "10px",
              }}
              id="city_name"
              ref={inputRef}
              type="text"
              placeholder="Search for a city..."
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setCanSearch(true);
                } else {
                  setCanSearch(false);
                  setShowResults(false);
                }
              }}
            />{" "}
            <button
              disabled={!canSearch}
              onClick={() => {
                handleClick();
              }}
              style={
                canSearch
                  ? {
                      backgroundColor: "#1ade16",
                      border: "10px",
                      color: "white",
                      height: "55px",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "23px",
                    }
                  : {
                      backgroundColor: "grey",
                      border: "10px",
                      color: "white",
                      height: "55px",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "23px",
                    }
              }
            >
              Search for Weather
            </button>
          </div>
          {/* Error Popup for User */}
          <div>
            {show ? (
              <div style={{ marginTop: "15px" }}>
                <Alert
                  style={{ borderRadius: "15px" }}
                  variant="danger"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <Alert.Heading
                    style={{
                      backgroundColor: "#f8d7da",
                      fontWeight: "bold",
                      alignContent: "center",
                    }}
                  >
                    Failed to fetch Weather Data for API!
                  </Alert.Heading>
                </Alert>
              </div>
            ) : null}
          </div>
          {/* Showing the results */}
          <div className="Results">
            {showResults ? (
              <div>
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "45px",
                    borderRadius: "10px",
                    border: "15px",
                    borderColor: "grey",
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "center",
                    width: "550px",
                    height: "350px",
                    padding: "15px",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  <div style={{
                    color: "black",
                    fontSize: "30px",
                    maxWidth: "200px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {data?.data[0]?.city_name}, {data.data[0].state_code}{" "}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#282c34",
                      }}
                    >
                      <h1>Temperature: {Math.floor(data.data[0].temp)}°F</h1>{" "}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#282c34",
                      }}
                    >
                      <h1>Sky Condition: {data.data[0].weather.description}</h1>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#282c34",
                      }}
                    >
                      <h1>
                        Wind Speed: {Math.floor(data.data[0].wind_spd)} mph
                      </h1>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#282c34",
                      }}
                    >
                      <h1>Humidity: {Math.floor(data.data[0].rh)}%</h1>
                    </div>
                  </div>
                </div>{" "}
              </div>
            ) : null}
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
