import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ApplyButton from '@/components/jobs/job/ApplyButton';

export default async function JobPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const jobId = (await params).id;

	const job = await prisma.job.findUnique({
		where: { id: jobId },
		include: { postedBy: true },
	});

	if (!job) {
		notFound();
	}

	return (
		<div className="max-w-6xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm p-8">
				<div className="">
					<div className=" flex justify-between items-center">
						<Link
							href="/jobs"
							className="text-blue-500 hover:text-blue-600 font-medium inline-block">
							← Back to Jobs
						</Link>
						<ApplyButton jobId={job.id}>
							Apply now
						</ApplyButton>
					</div>
					<div className="my-8 border-t border-gray-200"></div>

					<h1 className="text-3xl font-bold text-gray-900 mb-2 ">
						{job.title}
					</h1>
					<p className="text-xl text-gray-600 mb-4">{job.company}</p>
					<div className="flex items-center gap-4 text-gray-500 mb-6">
						<span>{job.location}</span>
						<span>•</span>
						<span>{job.type}</span>
						{job.salary && (
							<>
								<span>•</span>
								<span className="text-gray-900 font-medium">
									{job.salary}
								</span>
							</>
						)}
					</div>
					<div className="flex items-center text-sm text-gray-500">
						<span>Posted by {job.postedBy.name}</span>
						<span className="mx-2">•</span>
						<span>
							{formatDistanceToNow(new Date(job.createdAt), {
								addSuffix: true,
							})}
						</span>
					</div>
				</div>

				<div className="prose max-w-none">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Job Description
					</h2>
					<div className="text-gray-600 whitespace-pre-wrap">
						{job.description}
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
					<ApplyButton jobId={job.id}>
							Apply for this position
						</ApplyButton>
				</div>
			</div>
		</div>
	);
}
