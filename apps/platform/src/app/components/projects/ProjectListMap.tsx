'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import {
	LoadScript,
	Libraries,
	GoogleMap,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import icons from '@/app/components/common/Icons';
import ProjectMapInfoWindow from '@/app/components/project/ProjectMapInfoWindow';
import { getCustomPercentageMarkerIcon } from '@/app/helpers/projectHelper';

export interface ICoords {
	lat: number;
	lng: number;
}

// If you need some special libraries, you can add them here
const libraries: Libraries = [];

export default function ProjectListMap() {
	const [coords, setCoords] = useState<ICoords>({
		lat: 43.5081,
		lng: 16.4402,
	});

	const [selectedMarker, setSelectedMarker] = useState<{
		coords: ICoords;
		info: { title: string; progress: number; fundedAmount: number };
	} | null>(null);

	const mapRef = useRef<google.maps.Map | null>(null);
	const markerClustererRef = useRef<MarkerClusterer | null>(null);

	const onSelect = useCallback(
		(marker: {
			coords: ICoords;
			info: { title: string; progress: number; fundedAmount: number };
		}) => {
			setSelectedMarker(marker);
		},
		[],
	);

	const onCloseClick = () => {
		setSelectedMarker(null);
	};

	const mapStyles = [
		{
			featureType: 'poi', // Points of Interest
			elementType: 'all',
			stylers: [{ visibility: 'off' }],
		},
	];

	const greenMarkerIcon = {
		url: icons.markerIcon,
	};

	const zeroMarkerIcon = {
		url: icons.markerIconZero,
	};

	// TODO: Replace this with real data
	const markers = [
		{
			id: 1,
			coords: { lat: 43.5191413113884, lng: 16.449105382747074 },
			icon: getCustomPercentageMarkerIcon(15),
			info: {
				title: 'Project 1',
				progress: 15,
				fundedAmount: 500,
			},
		},
		{
			id: 2,
			coords: { lat: 43.51805339852162, lng: 16.44758970940925 },
			icon: zeroMarkerIcon,
			info: {
				title: 'Project 2',
				progress: 0,
				fundedAmount: 0,
			},
		},
		{
			id: 3,
			coords: { lat: 43.52046275847196, lng: 16.44811046218916 },
			icon: greenMarkerIcon,
			info: {
				title: 'Klupe od Đardina do Jokera',
				progress: 100,
				fundedAmount: 2000,
			},
		},
	];

	useEffect(() => {
		if (mapRef.current && markers.length > 0) {
			const map = mapRef.current;
			// Clear existing clusterer if it exists
			if (markerClustererRef.current) {
				markerClustererRef.current.clearMarkers();
			}
			// Create marker clusterer
			const markerCluster = new MarkerClusterer({ map });
			markers.forEach(markerData => {
				const marker = new google.maps.Marker({
					position: markerData.coords,
					icon: markerData.icon,
				});
				markerCluster.addMarker(marker);

				// Handle marker click
				google.maps.event.addListener(marker, 'click', () => {
					onSelect(markerData);
				});
			});
			markerClustererRef.current = markerCluster;
		}
	}, [markers, onSelect]);

	return (
		<div className='mt-2 flex flex-row flex-wrap'>
			<LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
				libraries={libraries}
			>
				<GoogleMap
					mapContainerStyle={{ width: '100%', height: '665px' }}
					center={coords}
					zoom={13}
					options={{
						draggable: true,
						disableDefaultUI: false,
						styles: mapStyles,
					}}
					onLoad={(map: google.maps.Map) => (mapRef.current = map)}
				>
					{selectedMarker && (
						<InfoWindow
							position={selectedMarker.coords}
							onCloseClick={onCloseClick}
						>
							<ProjectMapInfoWindow
								title={selectedMarker.info.title}
								progress={selectedMarker.info.progress}
								fundedAmount={selectedMarker.info.fundedAmount}
							/>
						</InfoWindow>
					)}
				</GoogleMap>
			</LoadScript>
		</div>
	);
}
