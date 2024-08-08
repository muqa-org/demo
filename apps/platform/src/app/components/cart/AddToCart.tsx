interface AddButtonProps {
	className?: string;
}

export default function AddToCart({ className }: AddButtonProps) {
	return (
		<button
			className={`${className} border-borderBlack rounded-md border bg-white px-2 py-1 text-sm font-medium text-primaryBlack hover:bg-gray-100 focus:outline-none`}
		>
			DODAJ U KOŠARICU
		</button>
	);
}
