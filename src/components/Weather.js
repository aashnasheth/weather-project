import React from 'react';


class Weather extends React.Component{
    render() {
            return (
                <div>
                    <h4><i> Weather Information </i></h4>
                    <p>Location: {this.props.location}</p>
                    <p>Temperature: {this.props.temperature} </p>
                    <p>Humidity: {this.props.humidity} </p>
                    <p>Inputted Zip: {this.props.zip}</p>
                    <p>Conditions: {this.props.cond}</p>
                </div>
            );
        }
}
export default Weather;

