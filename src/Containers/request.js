import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MyNav from './nav'
const mapStyles = {
    width: '90%',
    height: '70%',
    left: '5%'
};

export class Request extends Component {
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


    render() {
        return (

            <div className="map"> 
            <MyNav />
            <Card className="mapcard" style={{width: '90%', textAlign: 'left'}}>
                {/* <h3>Request a Donor Nearby:
                </h3> */}

                {/* <h6>coordinates({this.state.currentLocation.lat} , {this.state.currentLocation.lng})</h6> */}
                <Form>
                <Row className="su-title" >
                <div>REQUEST A DONOR</div>
        
                </Row>
                <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Recipient's Location:</Form.Label>
                <Form.Control  type="text" name="location" value={`${this.state.currentLocation.lat}, ${this.state.currentLocation.lng}`}  required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Required Blood Type:</Form.Label>
                <Form.Select defaultValue={"Select"} style={{fontSize: "14px"}}  name="Blood Group" required>
                <option value="Select"  disabled>Select.. </option>
                <option>A+</option>
                <option>A-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                </Form.Select>
                </Form.Group>
                <div className="d-grid  mb-3">
                <Button variant="danger"  type='submit' >
                Proceed Request
                </Button>
                </div>
                </Form>
            </Card>
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
})(Request)


// AIzaSyA8GSLEwOCybJ-uQAb2vKxbeSE9CjwmStw