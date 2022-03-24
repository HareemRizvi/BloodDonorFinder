import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MyNav from './nav';
const mapStyles = {
    width: '90%',
    height: '70%',
    left: '5%'
};

export class MapContainer extends Component {
       
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentLocation: {}
    };
    componentDidMount() {
        this.handleCurrentLocation();
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }

    };
    handleCurrentLocation = async () => {
        const self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            self.setState({
                currentLocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }); console.log(position)

        });
    }
    // displayLocation=()=>{
    //     var request = new XMLHttpRequest();

    //     var method = 'GET';
    //     var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    //     var async = true;
    //     var latitude=this.state.currentLocation.lat;
    //     var longitude=this.state.currentLocation.lng;
    //     request.open(method, url, async);
    //     request.onreadystatechange = function(){
    //       if(request.readyState == 4 && request.status == 200){
    //         var data = JSON.parse(request.responseText);
    //         var address = data.results[0];
    //         window.loc=address.formatted_address;
    //         // console.log("Address:", address.formatted_address);
    //       }
    //     };
    //     request.send();
    //   };

     

    render() {
        
        return (

            <div className="map" onLoad={()=>this.displayLocation()}> 
            <Card className="mapcard" style={{width: '90%', textAlign: 'left'}}>
                {/* <h3>Request a Donor Nearby:
                </h3> */}

                {/* <h6>coordinates({this.state.currentLocation.lat} , {this.state.currentLocation.lng})</h6> */}
                <Form>
                
                <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Your Current Location:</Form.Label>
                <Form.Control  type="text" name="location" value={`${this.state.currentLocation.lat} , ${this.state.currentLocation.lng}`}  required />
                </Form.Group>
                
                <div className="d-grid  mb-3">
                <Button variant="danger" type="submit"  >
                Confirm Location
                </Button>
                </div>
                </Form>
            </Card>
            {/* <Card className="mapcard" style={{width: '90%'}}>
                <h3>Your current location:
                </h3>

                <h6>coordinates({this.state.currentLocation.lat} , {this.state.currentLocation.lng})</h6>
                <div className="d-grid  mb-3">
                <Button variant="danger"   >
                Confirm Location
                </Button>
                </div>
            </Card> */}
                <div className="mapdiv">
               <Map google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                     onClick={this.onMapClicked}
                    >
                        <Marker onClick={this.onMarkerClick}
                            name={'karachi'} />
                    

                </Map> 
                </div>
            
                    
            </div>
            


        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAgYhbi3iUrafZOgMcr9X29vrrSg8rWaxM')
})(MapContainer)


// AIzaSyA8GSLEwOCybJ-uQAb2vKxbeSE9CjwmStw