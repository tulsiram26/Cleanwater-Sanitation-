import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapView = ({ reports, height = '600px' }) => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // India

  useEffect(() => {
    if (reports && reports.length > 0) {
      const avgLat =
        reports.reduce((sum, r) => sum + (r.location?.latitude || 0), 0) /
        reports.length;
      const avgLng =
        reports.reduce((sum, r) => sum + (r.location?.longitude || 0), 0) /
        reports.length;
      setCenter([avgLat, avgLng]);
    }
  }, [reports]);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'green';
      case 'In Progress':
        return 'blue';
      case 'Pending':
        return 'red';
      default:
        return 'gray';
    }
  };

  const createCustomMarker = (color) => {
    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{ height }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {reports?.map((report) => (
          report.location?.latitude && report.location?.longitude && (
            <Marker
              key={report._id}
              position={[report.location.latitude, report.location.longitude]}
              icon={createCustomMarker(getMarkerColor(report.status))}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-bold mb-2">{report.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{report.issueType}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded`}>
                    {report.status}
                  </span>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default MapView;
