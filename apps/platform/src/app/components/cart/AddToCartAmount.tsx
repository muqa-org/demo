interface AddAmountProps {
	className?: string;
}

export default function AddToCartAmount({ className }: AddAmountProps) {
	return (
		<div
			className={`${className} rounded-[14px] border border-borderGray bg-white p-5`}
		>
			<form>
				<input
					type='text'
					name='amount'
					placeholder='Unesi iznos'
					className='mr-5 w-32 border border-borderGray px-3 py-2 text-sm font-medium'
				/>
				<button
					type='submit'
					className='rounded-md border border-borderBlack bg-white px-3 py-2 text-sm font-medium text-primaryBlack hover:bg-gray-100 focus:outline-none'
				>
					Spremi
				</button>
			</form>
		</div>
	);
}
