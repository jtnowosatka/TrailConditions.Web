import React from 'react';
import './TrailConditionsMap.css';
import * as L from 'leaflet';

export default class TrailConditionsMap extends React.Component {
    private map: L.Map | null = null;

    private baseOverpassUrl : string = `https://overpass-api.de/api/interpreter?`;
    private featureQuery: string = `data=[out:json];(way["highway"]({bbox});>;);out;`;
    
    componentDidMount(){
        this.map = L.map('admin-trail-map', { tap: true, tapTolerance: 20 });

        let osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        let osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        
        let osm = L.tileLayer(osmUrl, {
            attribution: osmAttrib
        });
        
        this.map.addLayer(osm);

        this.map.setView([47.497646, -121.967777], 13);

        /*
        var bbox = this.map.getBounds();
        var bboxString = `${bbox.getSouth()},${bbox.getWest()},${bbox.getNorth()},${bbox.getEast()}`;

        var url = "http://localhost:7071/api/GetOsmData?bbox=" + bboxString;// "47.486062984875%2C-122.00403213501%2C47.526764442563%2C-121.93948745728";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                var geoJsonLayer = L.geoJSON(data.features);
                this.map?.addLayer(geoJsonLayer);
            });*/
    }

    public render() {
        return (<div id="admin-trail-map"></div>);
    }
}