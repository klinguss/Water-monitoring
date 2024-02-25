import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { Popup, Marker, TileLayer, MapContainer } from 'react-leaflet';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'; // Import Leaflet CSS

function MapView() {
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false); // Set loading to false after getting location
      },
      (error) => {
        console.error('Error getting user location:', error);
        setIsLoading(false); // Also set loading to false on error
      }
    );
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Maps
      </Typography>
      {isLoading ? (
        <Typography variant="body1" color="textSecondary">
          Loading map...
        </Typography>
      ) : (
        <MapContainer center={userLocation} zoom={13} style={{ height: '550px' }}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Current device!</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </Container>
  );
}

export default MapView;
