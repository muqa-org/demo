'use client';

import { useCallback, useState } from 'react';
import {
	GoogleMap,
	InfoWindow,
	Marker,
	MarkerClustererF,
} from '@react-google-maps/api';

import icons from '@/app/components/common/Icons';
import ProjectMapInfoWindow from '@/app/components/project/ProjectMapInfoWindow';
import { getCustomPercentageMarkerIcon } from '@/app/helpers/projectHelper';

export interface ICoords {
	lat: number;
	lng: number;
}

export default function ProjectListMap() {
	const [coords, setCoords] = useState<ICoords>({
		lat: 43.5081,
		lng: 16.4402,
	});

	const [selectedMarker, setSelectedMarker] = useState<{
		coords: ICoords;
		info: { title: string; progress: number; fundedAmount: number };
	} | null>(null);

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

	return (
		<div className='mt-2 flex flex-row flex-wrap'>
			<GoogleMap
				mapContainerStyle={{ width: '100%', height: '665px' }}
				center={coords}
				zoom={13}
				options={{
					draggable: true,
					disableDefaultUI: false,
					styles: mapStyles,
				}}
			>
				<MarkerClustererF>
					{clusterer => (
						<>
							{markers.map(marker => (
								<Marker
									key={marker.id}
									position={marker.coords}
									icon={marker.icon}
									clusterer={clusterer}
									onClick={() => onSelect(marker)}
								/>
							))}
						</>
					)}
				</MarkerClustererF>
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
		</div>
	);
}
