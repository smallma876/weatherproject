import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';
import transformWeather from '../../services/transformWheater';
import getUrlWeatherByCity  from './../../services/getUrlWeatherByCity';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';

class WeatherLocation extends Component {

    constructor(props) {
        super(props);
        const { city } = props;
        this.state = {
            city,
            data: null,
        };
        
    }

    componentDidMount(){
       
        this.handleUpdateClick();
    }
    
    componentDidUpdate(prevProps, prevState) {
        
    }
    
    handleUpdateClick = () =>{
        const api_weather = getUrlWeatherByCity(this.state.city);
        fetch(api_weather).then( respuesta => {
            return respuesta.json();
        }).then(data => {
            
            const newWeather = transformWeather(data);
            
            this.setState({
                data: newWeather
            });
        });
    }

    render(){
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;
        return (
            <div className = "weatherLocationCont" onClick={onWeatherLocationClick}>
                    <Location city={ city }></Location>
                    {data?<WeatherData data={ data }></WeatherData>:<CircularProgress size={60} thickness={7}/>}
            </div>
        ); 
    }
}

WeatherLocation.propTypes = {
    city: PropTypes.string,
    onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;

