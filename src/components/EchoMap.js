"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const EchoMap = ({ encounters }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-74.5, 40], // Default center
      zoom: 2,
      projection: 'globe'
    });

    map.current.on('style.load', () => {
      map.current.setFog({}); // Add atmospheric fog
      
      // Add data source for heatmap
      map.current.addSource('echoes', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: encounters.map(e => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [e.lng || 0, e.lat || 0]
            },
            properties: {
              intensity: 1
            }
          }))
        }
      });

      // Add heatmap layer
      map.current.addLayer({
        id: 'echoes-heat',
        type: 'heatmap',
        source: 'echoes',
        maxzoom: 9,
        paint: {
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'intensity'], 0, 0, 6, 1],
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(47,217,244)', // Electric Azure
            0.8, 'rgb(253,219,199)',
            1, 'rgb(239,68,68)' // High intensity red
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Update data when encounters change
    const source = map.current.getSource('echoes');
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: encounters.map(e => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [e.lng || 0, e.lat || 0]
          },
          properties: {
            intensity: 1
          }
        }))
      });
    }
  }, [encounters]);

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default EchoMap;
