/**
 * Determines the background color class for a project's progress bar
 * based on the given progress percentage.
 *
 * @param {number} progressPercentage - The current progress of the project as a percentage (from 0 to 100).
 * @returns {string} - A string representing the CSS class name for the background color.
 *
 * - Returns `'bg-[#C9767B]'` for progress between 1% and 33%.
 * - Returns `'bg-[#E2CB55]'` for progress between 34% and 66%.
 * - Returns `'bg-[#09CE78]'` for progress between 67% and 100%.
 * - Returns `'bg-green'` if progress is 0% or any other value outside the 1-100 range.
 */
export const getProjectProgressBGColor = (
	progressPercentage: number,
): string => {
	let progressColor = 'bg-green';
	if (progressPercentage > 0 && progressPercentage <= 33) {
		progressColor = 'bg-[#C9767B]';
	} else if (progressPercentage > 33 && progressPercentage <= 66) {
		progressColor = 'bg-[#E2CB55]';
	} else if (progressPercentage > 66 && progressPercentage <= 100) {
		progressColor = 'bg-[#09CE78]';
	}
	return progressColor;
};

export const getCustomPercentageMarkerIcon = (percentage: number): string => {
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
};
