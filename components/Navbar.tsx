'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
	const { data: session } = useSession();

	console.log('Session in Navbar:', session);

	return (
		<nav className="bg-white shadow-md text-gray-700 hover:text-gray-800">
			<div className="container mx-auto px-2">
				<div className="flex justify-between items-center py-2">
					<Link href="/" className="flex items-center">
						<Image src={'/logo.png'} alt="Logo" width={40} height={40} />
						<span className="ml-2 font-bold hover:text-blue-800">
							JobZilla
						</span>
					</Link>

					{session ? (
						<>
							<div className="space-x-8 text-sm">
								<Link
									href="/jobs"
									className="rounded-md hover:bg-blue-100 p-2">
									Browse Jobs
								</Link>
								<Link
									href="/jobs/post"
									className="rounded-md hover:bg-blue-100 p-2">
									Post a Job
								</Link>
								<Link
									href="/dashboard"
									className="rounded-md hover:bg-blue-100 p-2">
									Dashboard
								</Link>
							</div>
							<div className="space-x-4 text-sm pr-8">
								<button
									onClick={() => {
										signOut({ callbackUrl: '/auth/sign-in' });
									}}
									className="rounded-md hover:bg-red-100 p-2">
									Sign Out
								</button>
							</div>
						</>
					) : (
						<>
							<div>
								<Link
									href="/jobs"
									className="rounded-md hover:bg-blue-100 p-2">
									Browse Jobs
								</Link>
							</div>
							<div className="space-x-4 text-sm pr-8">
								<Link
									href="/auth/sign-in"
									className="rounded-md hover:bg-blue-100 p-2">
									Sign In
								</Link>
								<Link
									href="/auth/sign-up"
									className="rounded-md hover:bg-blue-100 p-2">
									Sign Up
								</Link>
							</div>
						</>
					)}
					{/* </div> */}
				</div>
			</div>
		</nav>
	);
}
