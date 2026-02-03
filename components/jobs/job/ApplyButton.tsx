'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ApplyButtonProps {
	children: React.ReactNode;
	jobId: string;
}

export default function ApplyButton({ children, jobId }: ApplyButtonProps) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [ApplicationStatus, setApplicationStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const handleApply = async () => {
		if (!session) {
			router.push('/auth/sign-in');
			return;
		}

		setErrorMessage('');
		setApplicationStatus('idle');

		try {
			await fetch(`/api/jobs/${jobId}/apply`, {
				method: 'POST',
			});
			setApplicationStatus('success');
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(
					'Failed to apply for the job. Please try again later.',
				);
			}
			setApplicationStatus('error');
		}
	};

	if (status === 'loading') {
		return (
			<button
				type="button"
				disabled
				className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors">
				Loading...
			</button>
		);
	}

	if (ApplicationStatus === 'success') {
		return (
			<>
				<p className="text-green-600 py-2 px-4">Application Successful!</p>
				<Link
					href="/dashboard"
					className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors">
					View your applications
				</Link>
			</>
		);
	}

	return (
		<>
			<button
				type="button"
				onClick={handleApply}
				className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors">
				{children}
			</button>
			{ApplicationStatus === 'error' && (
				<p className="text-red-500 py-2 px-4">{errorMessage}</p>
			)}
		</>
	);
}
