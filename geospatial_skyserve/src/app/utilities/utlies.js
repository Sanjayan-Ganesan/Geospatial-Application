// utils.js

// Parse GeoJSON data
export function parseGeoJSON(data) {
    try {
        if (typeof data !== 'string') {
            console.error('Expected string data but received:', typeof data, data);
            return null;
        }

        const trimmedData = data.trim();
        const parsedData = JSON.parse(trimmedData);

        if (parsedData.type !== 'FeatureCollection' || !Array.isArray(parsedData.features)) {
            console.error('Invalid GeoJSON format: missing FeatureCollection type or features array', parsedData);
            return null;
        }

        parsedData.features.forEach((feature, index) => {
            if (!feature.geometry || !feature.geometry.type || !feature.geometry.coordinates) {
                console.error(`Invalid GeoJSON: Missing geometry attributes in feature at index ${index}`, feature);
                return null;
            }
        });

        return parsedData;

    } catch (error) {
        console.error('Error parsing GeoJSON:', error, '\nData:', data);
        return null;
    }
}

// Calculate viewport bounds from GeoJSON data
export function fitBoundsFromGeoJSON(geojson) {
    const coordinates = geojson.features.flatMap((feature) => {
        if (feature.geometry.type === 'Point') {
            return [feature.geometry.coordinates];
        } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiPoint') {
            return feature.geometry.coordinates;
        } else if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiLineString') {
            return feature.geometry.coordinates.flat();
        } else if (feature.geometry.type === 'MultiPolygon') {
            return feature.geometry.coordinates.flat(2);
        }
        return [];
    });

    if (coordinates.length === 0) return { latitude: 0, longitude: 0, zoom: 1 };

    const lats = coordinates.map(coord => coord[1]);
    const lngs = coordinates.map(coord => coord[0]);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latitude = (minLat + maxLat) / 2;
    const longitude = (minLng + maxLng) / 2;
    const latRange = maxLat - minLat;
    const lonRange = maxLng - minLng;
    const zoom = Math.max(1, Math.log(Math.min(latRange, lonRange)) + 5); // Calculate dynamic zoom

    return { latitude, longitude, zoom };
}
