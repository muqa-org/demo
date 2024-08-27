'use client';

import { useState } from 'react';
import {
	LoadScript,
	Libraries,
	GoogleMap,
	Marker,
} from '@react-google-maps/api';

import icons from '@/app/components/common/Icons';
import { getCustomPercentageMarkerIcon } from '@/app/helpers/projectHelper';

export interface ICoords {
	lat: number;
	lng: number;
}

// If you need some special libraries, you can add them here
const libraries: Libraries = [];

export default function ProjectMap() {
	const [coords, setCoords] = useState<ICoords>({
		lat: 43.5081,
		lng: 16.4402,
	});

	const [selectedMarker, setSelectedMarker] = useState<{
		coords: ICoords;
		info: { title: string; progress: number; fundedAmount: number };
	} | null>(null);

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

	return (
		<div className='mt-6 flex flex-row flex-wrap rounded-lg overflow-hidden'>
			<LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
				libraries={libraries}
			>
				<GoogleMap
					mapContainerStyle={{ width: '100%', height: '184px' }}
					center={coords}
					zoom={13}
					options={{
						draggable: true,
						disableDefaultUI: false,
						styles: mapStyles,
					}}
				>
					<Marker
						key={22}
						position={coords}
						icon={getCustomPercentageMarkerIcon(15)}
					/>
				</GoogleMap>
			</LoadScript>
		</div>
	);
}
