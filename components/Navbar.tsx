import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
	return (
		<nav className="bg-white shadow-md text-gray-600 hover:text-gray-800">
			<div className="container mx-auto px-2">
				<div className="flex justify-between items-center py-2">
					<div className="flex ">
						<Link href="/" className="flex items-center">
							<Image
								src={'/logo.png'}
								alt="Logo"
								width={40}
								height={40}
							/>
							<span className="ml-2 font-bold hover:text-gray-500">
								JobZilla
							</span>
						</Link>
					</div>
					<div className="space-x-8 text-sm">
						<Link
							href="/jobs"
							className="rounded-md hover:bg-gray-100 p-2">
							Browse Jobs
						</Link>
						<Link
							href="/jobs/post"
							className="rounded-md hover:bg-gray-100 p-2">
							Post a Job
						</Link>
						<Link
							href="/dashboard"
							className="rounded-md hover:bg-gray-100 p-2">
							Dashboard
						</Link>
					</div>
					<div className="space-x-4 text-sm pr-8">
						<Link
							href="/auth/sign-in"
							className="rounded-md hover:bg-gray-100 p-2">
							Sign In
						</Link>
						<Link
							href="/auth/sign-up"
							className="rounded-md hover:bg-gray-100 p-2">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
