'use client';

import { useCallback, useEffect, useState } from 'react';
import {
	LoadScript,
	Libraries,
	GoogleMap,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

import icons from '@/app/components/common/Icons';
import ProjectMapInfoWindow from '@/app/components/project/ProjectMapInfoWindow';

export interface ICoords {
	lat: number;
	lng: number;
}

// If you need some special libraries, you can add them here
const libraries: Libraries = [];

function getCustomPercentageMarkerIcon(percentage: number): string {
	const svgMarker = `
			<svg width="94" height="86" viewBox="0 0 94 86" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_274_2813)">
						<path d="M73.6635 56.3125C72.547 60.6875 47.534 66 47.534 66C47.534 66 21.907 60.2188 20.3995 56.3125C18.892 52.4063 20.3995 46 47.534 46C74.6685 46 74.78 51.9375 73.6635 56.3125Z" fill="black" fill-opacity="0.5"/>
				</g>
				<path d="M75.3976 33C74.2866 47 49.3975 64 49.3975 64C49.3975 64 23.8976 45.5 22.3975 33C20.8975 20.5 22.3975 0 49.3975 0C76.3975 0 76.5085 19 75.3976 33Z" fill="#FF9500"/>
				<text x="52%" y="32%" fill="white" font-size="20" font-family="Arial" font-weight="bold" text-anchor="middle" dy=".3em">${percentage}%</text>
				<defs>
						<filter id="filter0_f_274_2813" x="0" y="26" width="94" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix"/>
								<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
								<feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_274_2813"/>
						</filter>
				</defs>
		</svg>
	`;

	const encoded = encodeURIComponent(svgMarker);
	const iconUrl = `data:image/svg+xml,${encoded}`;

	return iconUrl;
}

export default function ProjectListMap() {
	const [coords, setCoords] = useState<ICoords>({
		lat: 43.5081,
		lng: 16.4402,
	});

	const [selectedMarker, setSelectedMarker] = useState<{ coords: ICoords; info: { title: string; progressPercentage: number; fundedAmount: number } } | null>(null);

	const onSelect = useCallback((marker: { coords: ICoords; info: { title: string; progressPercentage: number; fundedAmount: number } }) => {
		setSelectedMarker(marker);
	}, []);

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
				progressPercentage: 15,
				fundedAmount: 500,
			},
		},
		{
			id: 2,
			coords: { lat: 43.51805339852162, lng: 16.44758970940925 },
			icon: zeroMarkerIcon,
			info: {
				title: 'Project 2',
				progressPercentage: 0,
				fundedAmount: 0,
			},
		},
		{
			id: 3,
			coords: { lat: 43.52046275847196, lng: 16.44811046218916 },
			icon: greenMarkerIcon,
			info: {
				title: 'Klupe od Đardina do Jokera',
				progressPercentage: 100,
				fundedAmount: 2000,
			},
		},
	];

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
				>
					{markers.map(marker => (
						<Marker
							key={marker.id}
							position={marker.coords}
							onClick={() => onSelect(marker)}
							icon={marker.icon}
						/>
					))}
					{selectedMarker && (
						<InfoWindow
							position={selectedMarker.coords}
							onCloseClick={onCloseClick}
						>
							<ProjectMapInfoWindow
								title={selectedMarker.info.title}
								progressPercentage={selectedMarker.info.progressPercentage}
								fundedAmount={selectedMarker.info.fundedAmount}
							/>
						</InfoWindow>
					)}
				</GoogleMap>
			</LoadScript>
		</div>
	);
}
