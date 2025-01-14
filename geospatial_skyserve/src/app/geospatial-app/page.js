"use client";

import { useEffect, useState, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import '../geospatial-app/geospatial.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { parseGeoJSON, fitBoundsFromGeoJSON } from '../utilities/utlies';
import * as GeoTIFF from 'geotiff';
import { Room } from '@material-ui/icons';
//import kmlparser from 'kml-parser';

export default function GeospatialApplication() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 12.8452,
    longitude: 77.6602,
    zoom: 5
  });
  const [geoData, setGeoData] = useState(null);
  const [layerVisible, setLayerVisible] = useState(false);

  const Token = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1Ijoic2FuamF5MTEzIiwiYSI6ImNtNXV4aTR3MTAxNnUyaXF3bjRpbHE2c3MifQ.5WKy6qWxY5BWgc1sMD1-jQ';

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        let fileContent = e.target.result;
        let parsedData;
        try {
          if (file.type === 'application/json' ||
            file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
            parsedData = parseGeoJSON(fileContent);
          } else if (
            file.type.startsWith('image/tiff') ||
            file.type.startsWith('image/x-tiff') ||
            file.name.endsWith('.tiff') ||
            file.name.endsWith('.tif')
          ) {
            const tiff = await GeoTIFF.fromArrayBuffer(new TextEncoder().encode(fileContent).buffer);
            const image = await tiff.getImage();
            const geojson = await image.getGeoJSON();
            parsedData = geojson;
          }

          setGeoData(parsedData);

          if (parsedData) {
            const { latitude, longitude, zoom } = fitBoundsFromGeoJSON(parsedData);
            setViewport({ latitude, longitude, zoom });
            setLayerVisible(true);
          }
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDblClick = (e) => {
    const lati = e.lngLat.lat;
    const long = e.lngLat.lng;
    setNewPlace({
      lat: lati,
      long: long
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('loggedInUser');
      setLoggedInUser(user);
    }
  }, []);

  const onViewportChange = useCallback((newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  }, [viewport]);

  const handleDoubleClick = useCallback((newViewport) => {
    setViewport({ ...viewport, ...newViewport,zoom: newViewport.zoom + 1  });
  }, [viewport]);

  const created = (e) =>{
    console.log(e)
  }

  return (
    <div className="container w-100 Wrapper">
      <div className='leftSidePartWrap'>
        <h4>Welcome <span>{loggedInUser}</span>!</h4>
      </div>

      <div className='BottomSidePartWrap'>
        <div className='uploadFilesSection'>
          <div className='TxtUpload'>
            <h4>Upload Files</h4>
          </div>

          <div className='TxtUpload'>
            <p>Please Upload GeoJSON/GeoTIFF Files*</p>
          </div>

          <div className='Wrapper'>
            <div>
              <input type="file" id="file" accept=".geojson,.json,.tiff,.tif" onChange={handleFileUpload} />
              <label htmlFor="file">Choose a file</label>
            </div>
          </div>

        </div>

        <div className='MapsSection'>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken={Token}
            width="100%"
            height="100%"
            transitionDuration="100"
            mapStyle="mapbox://styles/sanjay113/cm5v4lf1a000v01r3d4y9hglf"
            onDrag={onViewportChange}
            onDblClick={handleDblClick}
            onZoomEnd={handleDoubleClick}
            >

            {newPlace && (
              <Marker
                latitude={newPlace.lat}
                longitude={newPlace.long}
                offsetTop={-7 * viewport.zoom}
                offsetLeft={-3.5 * viewport.zoom}
              >
                <Room style = {{fontSize: 25,color:"tomato",cursor:'pointer'}}/>
              </Marker>
            )}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
}