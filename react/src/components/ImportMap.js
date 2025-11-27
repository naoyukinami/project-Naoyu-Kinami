import { useEffect } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';


const ImportMap = ()=> {
    useEffect(() => {
        const map = L.map('map');
        map.setView([49.2827, -123.1207], 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        let marker, circle;

        const success = ((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;

            if (marker) {
                map.removeLayer(marker);
                map.removeLayer(circle);
            }

            marker = L.marker([lat, lon]).addTo(map);
            circle = L.circle([lat, lon], { radius: accuracy }).addTo(map);

            map.fitBounds(circle.getBounds());
        });

        const error = ((error) => {
            if (error.code === 1) {
                alert("Please allow location access.")
            } else {
                alert("Cannot get current location.")
            }
        })

        navigator.geolocation.watchPosition(success, error);

    }, []);

    return (
        <>
        <h3><i className="fa-solid fa-earth-americas"></i> MAP</h3>
        <div id="map" style={{ height: "400px" }}></div>
        </>
    )
}

export default ImportMap;