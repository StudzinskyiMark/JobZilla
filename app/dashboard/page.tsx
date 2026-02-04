import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function dashboardPage() {
	const session = await auth();

	if (!session?.user!.id) {
		redirect('/auth/sign-in');
	}

	const [application, postedJobs] = await Promise.all([
		//applications
		prisma.application.findMany({
			where: {
				userId: session.user!.id,
			},
			include: {
				job: {
					include: {
						postedBy: true,
					},
				},
			},
			orderBy: {
				appliedAt: 'desc',
			},
		}),
		//posted jobs
		prisma.job.findMany({
			where: {
				postedById: session.user!.id,
			},
			include: {
				_count: {
					select: {
						applications: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		}),
	]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-2xl text-center font-bold text-gray-900 mb-8">
				Dashboard
			</h1>

			<div className="grid gap-8 md:grid-cols-2 items-start mt-4">
				{/* Posted Jobs Section */}
				<div className="flex flex-col col-span-1">
					<div className="flex justify-between items-center mb-6 h-10">
						<h2 className="text-xl font-semibold text-gray-900">
							Posted Jobs
						</h2>
						<Link
							href="/jobs/post"
							className="bg-blue-500 hover:bg-blue-600 font-medium text-white px-4 py-2 rounded-md">
							Post New Job
						</Link>
					</div>

					{postedJobs.length === 0 ? (
						<div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 my-2 min-h-40">
							<p className="p-6 text-gray-500 text-center">
								You haven&apos;t posted any jobs yet.
							</p>
						</div>
					) : (
						postedJobs.map((job) => (
							<Link key={job.id} href={`/jobs/${job.id}`}>
								<div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 my-2 min-h-40">
									<div className="p-6">
										<div className="flex justify-between items-start">
											<div>
												<h3 className="text-lg font-medium text-gray-900 mb-1">
													{job.title}
												</h3>
												<p className="text-gray-600 mb-2">
													{job.company}
												</p>
												<div className="flex items-center text-sm text-gray-500">
													<span>{job.location}</span>
													<span className="mx-2">•</span>
													<span>{job.type}</span>
													<span className="mx-2">•</span>
													<span>
														{formatDistanceToNow(
															new Date(job.createdAt),
															{
																addSuffix: true,
															},
														)}
													</span>
												</div>
											</div>
											<div className="text-right">
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-blue-600">
													{job._count.applications} applications
												</span>
											</div>
										</div>
										<div className="mt-4 flex justify-end space-x-4"></div>
									</div>
								</div>
							</Link>
						))
					)}
				</div>
				{/* Applications Section */}
				<div className="flex flex-col col-span-1">
					<div className="flex items-center mb-6 h-10">
						<h2 className="text-xl font-semibold text-gray-900  ">
							Your Applications
						</h2>
					</div>

					{application.length === 0 ? (
						<div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 my-2 min-h-40">
							<p className="p-6 text-gray-500 text-center">
								You haven&apos;t applied to any jobs yet.
							</p>
						</div>
					) : (
						application.map((application) => (
							<Link
								key={application.id}
								href={`/jobs/${application.job.id}`}>
								<div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 my-2 min-h-40">
									<div className="p-6">
										<div className="flex justify-between items-start">
											<div>
												<h3 className="text-lg font-medium text-gray-900 mb-1">
													{application.job.title}
												</h3>
												<p className="text-gray-600 mb-2">
													{application.job.company}
												</p>
												<div className="flex items-center text-sm text-gray-500">
													<span>{application.job.location}</span>
													<span className="mx-2">•</span>
													<span>{application.job.type}</span>
													<span className="mx-2">•</span>
													<span>
														Applied{' '}
														{formatDistanceToNow(
															new Date(application.appliedAt),
															{
																addSuffix: true,
															},
														)}
													</span>
												</div>
											</div>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													application.status === 'PENDING'
														? 'bg-yellow-100 text-yellow-800'
														: application.status === 'ACCEPTED'
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
												}`}>
												{application.status}
											</span>
										</div>
										<div className="mt-4 flex justify-end"></div>
									</div>
								</div>
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	);
}
