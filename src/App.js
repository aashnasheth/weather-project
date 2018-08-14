import React from 'react';
import Weather from './components/Weather';

const apiKey = 'c6568d4d00acb98664770c23b9bf6bda';
//example of apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=c6568d4d00acb98664770c23b9bf6bda'

class App extends React.Component {

    constructor(props) { //technically don't need constructor, super, etc in React
        super(props);
        this.state = {
            location: undefined,
            temperature: undefined,
            humidity: undefined,
            zip: undefined,
            cond: undefined, //conditions (clear sky, haze, etc)
            cod: undefined, //code signifying error or not (200 is valid input, 404 is invalid input)
        };
        this.handleChange = this.handleChange.bind(this); //must bind functions to the constructor *QUESTION: why?
        this.getAPIinfo = this.getAPIinfo.bind(this);
    }


    getAPIinfo = async (e) => { //*QUESTION: async?
        e.preventDefault(); //prevents page from COMPLETELY reloading after submit button is pressed
        //1: make api call
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${apiKey}&units=imperial`);
        //fetches info from API //`` means template string... allows you to inject variables in a string

        //2: convert API call to JSON... converts API data to readable format
        const data = await api_call.json(); //doesn't need any parsing //can get info by looking at postman
        //const is same thing as var in normal JS

        //3: set states to what is given by JSON
        if (this.state.zip) { //if zip exists
            this.setState({ //find code
                cod: data.cod
            });
            if (this.state.cod === 200) { //discerns if valid input
                this.setState({
                    temperature: Math.round(data.main.temp) + "°F",
                    humidity: data.main.humidity + "%",
                    location: data.name + ", " + data.sys.country,
                    cond: data.weather[0].description,
                });
             }
             else{ //if not valid input
                this.setState({
                    temperature: undefined,
                    humidity: undefined,
                    location: undefined,
                    cond: undefined,
                })
                alert("INPUT ERROR: Invalid zipcode. Please input a valid US zipcode.")
            }
        }
        else { //if no zipcode entered
            this.setState({
                temperature: undefined,
                humidity: undefined,
                location: undefined,
                cond: undefined,
            })
            alert("INPUT ERROR: Empty zipcode. Please input a US zipcode.")
        }
    };

    handleChange = (e) => { //sets zip to user input
        this.setState({zip: e.target.value});

    };

    render() {
            return (
                <div>
                    <h1>AA Weather</h1>
                    <p>Input your zipcode to get information about weather conditions around your area:
                        <input value={this.state.zip} type="text" name="zipcode" placeholder="Enter Zip Code"
                               onChange={this.handleChange}/>
                        <button onClick={this.getAPIinfo}>submit</button>
                        <p><i>*Note: you must input a zipcode in the USA</i></p>
                    </p>
                    <Weather //calls display component
                        location={this.state.location} //properties
                        temperature={this.state.temperature}
                        humidity={this.state.humidity}
                        zip={this.state.zip}
                        cond={this.state.cond}
                    />
                </div>
            );
        }
}

export default App;