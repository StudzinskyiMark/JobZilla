'use client';

interface ApplyButtonProps {
	children: React.ReactNode;
	jobId: string;
}

export default function ApplyButton({ children, jobId }: ApplyButtonProps) {
	const handleApply = () => {
		console.log(`Applying for job with ID: ${jobId}`);
	};

	return (
		<>
			<button
				type="button"
				onClick={handleApply}
				className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors">
				{children}
			</button>
		</>
	);
}
