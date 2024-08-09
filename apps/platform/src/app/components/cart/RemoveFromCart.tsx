interface RemoveButtonProps {
	className?: string;
}

export default function RemoveFromCart({ className }: RemoveButtonProps) {
	return (
		<button
			className={`${className} border-none rounded-none bg-white px-2 py-1 text-sm font-medium text-gray underline hover:text-primaryBlack focus:outline-none`}
		>
			Ukloni iz moje košarice
		</button>
	);
}
