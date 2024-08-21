export const getProjectProgressBGColor = (
	progressPercentage: number,
): string => {
	let progressColor = 'bg-green';
	if (progressPercentage > 0 && progressPercentage <= 33) {
		progressColor = 'bg-[#C9767B]';
	} else if (progressPercentage > 33 && progressPercentage <= 66) {
		progressColor = 'bg-[#E2CB55]';
	} else if (progressPercentage > 66 && progressPercentage <= 100) {
		progressColor = 'bg-green';
	}
	return progressColor;
};
