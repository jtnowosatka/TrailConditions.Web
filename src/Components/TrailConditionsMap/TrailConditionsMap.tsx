import React from 'react';
import './TrailConditionsMap.css';
import * as L from 'leaflet';

export default class TrailConditionsMap extends React.Component {
    private map: L.Map | null = null;
    private geoJsonLayer: L.Layer | null = null;
    
    componentDidMount(){
        this.map = L.map('admin-trail-map', { tap: true, tapTolerance: 20 });

        let osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        let osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        
        let osm = L.tileLayer(osmUrl, {
            attribution: osmAttrib
        });
        
        this.map.addLayer(osm);

        this.map.setView([47.497646, -121.967777], 14);

        this.updateMap();

        this.map.on("moveend", () => this.updateMap());
        this.map.on("zoom", () => this.updateMap())
    }

    public render() {
        return (<div id="admin-trail-map"></div>);
    }

    updateMap(){
        if(this.map && this.map.getZoom() > 13){
            var bbox = this.map.getBounds();
            var bboxString = `${bbox.getSouth()},${bbox.getWest()},${bbox.getNorth()},${bbox.getEast()}`;

            var serviceHostUrl = process.env.NODE_ENV === "production" ?
                "https://trailconditions-api-devtest.azurewebsites.net" :
                "http://localhost:7071";

            var url = `${serviceHostUrl}/api/GetOsmData?bbox=${bboxString}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if(this.geoJsonLayer){
                        this.map?.removeLayer(this.geoJsonLayer as L.Layer);
                    }
                    
                    this.geoJsonLayer = L.geoJSON(data.features);
                    this.map?.addLayer(this.geoJsonLayer);
                });
        }else{
            this.map?.removeLayer(this.geoJsonLayer as L.Layer);
        }
    }
}