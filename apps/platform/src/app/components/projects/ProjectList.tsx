import ProjectCard from '@/app/components/project/ProjectCard';
import Pagination from '@/app/components/Pagination';
import ProjectsSidebar from '@/app/components/projects/ProjectsSidebar';
import { FundedApplication } from '@allo/kit';

type ProjectListProps = {
	applications: FundedApplication[];
};

export default function ProjectListTable({ applications }: ProjectListProps) {
	return (
		<div className='mt-2 flex flex-row flex-wrap'>
			<div className='order-2 w-full lg:order-1 lg:w-5/6'>
				<div className='grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
					{applications.map((item) => (
						<ProjectCard
							key={item.id}
							application={item}
							className='mb-5'
						/>
					))}
				</div>
				<div>
					<Pagination
						currentPage={2}
						totalPages={10}
						baseLink='/projects'
						maxVisiblePages={5}
					/>
				</div>
			</div>
			<div className='order-1 mb-10 w-full pl-0 lg:order-2 lg:w-1/6 lg:pl-2 xl:pl-16'>
				<ProjectsSidebar />
			</div>
		</div>
	);
}
