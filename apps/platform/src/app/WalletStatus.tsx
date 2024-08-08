'use client';

import { useAccount } from 'wagmi';

export function WalletStatus() {
	const account = useAccount();

	return (
		<div className='w-1/6 border-gray-200 fixed left-8 top-40 h-auto rounded-lg border bg-white px-4 py-2'>
			<div>
				<span className='mr-2 font-semibold'>STATUS</span>
				<span className='text-xs'>{account?.status}</span>
			</div>
			<div>
				<span className='mr-2 font-semibold'>CONNECTOR</span>
				<span className='text-xs'>{account?.connector?.name}</span>
			</div>
			<div>
				<span className='mr-2 font-semibold'>CHAIN</span>
				<span className='text-xs'>{account?.chain?.name}</span>
			</div>
			<div>
				<span className='mr-2 font-semibold'>CONNECTED ADDRESSES</span>
				<ul>
					{account?.addresses?.map(address => (
						<li key={address} className='text-xs'>
							{address}
						</li>
					)) ?? []}
				</ul>
			</div>
		</div>
	);
}
