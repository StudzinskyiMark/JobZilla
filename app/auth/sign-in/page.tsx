'use client';

// import { signInUser } from '@/lib/auth';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
	return (
		<div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-4rem)] px-4">
			<div className="bg-white rounded-md shadow-md w-full max-w-md space-y-6 p-4">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-gray-900">JobZilla</h1>
					<p className="text-gray-600 text-sm">Sign in to your account</p>
				</div>

				{/* GitHub Sign In Button */}
				<button
					onClick={() => {
						signIn('github', { callbackUrl: '/' });
					}}
					className="w-full flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 rounded-md p-2 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="-2 -2 24 24"
						className="h-5 w-5 fill-current">
						<path
							fill="currentColor"
							fillRule="evenodd"
							d="M10 0c5.523 0 10 4.59 10 10.253 0 4.529-2.862 8.371-6.833 9.728-.507.101-.687-.219-.687-.492 0-.338.012-1.442.012-2.814 0-.956-.32-1.58-.679-1.898 2.227-.254 4.567-1.121 4.567-5.059 0-1.12-.388-2.034-1.03-2.752.104-.259.447-1.302-.098-2.714 0 0-.838-.275-2.747 1.051A9.396 9.396 0 0 0 10 4.958a9.375 9.375 0 0 0-2.503.345C5.586 3.977 4.746 4.252 4.746 4.252c-.543 1.412-.2 2.455-.097 2.714-.639.718-1.03 1.632-1.03 2.752 0 3.928 2.335 4.808 4.556 5.067-.286.256-.545.708-.635 1.371-.57.262-2.018.715-2.91-.852 0 0-.529-.985-1.533-1.057 0 0-.975-.013-.068.623 0 0 .655.315 1.11 1.5 0 0 .587 1.83 3.369 1.21.005.857.014 1.665.014 1.909 0 .271-.184.588-.683.493C2.865 18.627 0 14.783 0 10.253 0 4.59 4.478 0 10 0"
						/>
					</svg>
					<span>Continue with Github</span>
				</button>
				{/* 'or' Divider  */}
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-white px-2 text-gray-500">or</span>
					</div>
				</div>
				{/* Email Sign In */}
				<div className="space-y-3 text-gray-600 hover:text-gray-500">
					<input
						type="email"
						placeholder="Email address"
						className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button className="w-full bg-gray-100 hover:text-gray-600 hover:bg-gray-200 rounded-md p-2 text-sm">
						Sign in
					</button>
				</div>

				{/* Footer Links */}
				<div className="text-center text-xs text-gray-600 space-y-2">
					<p>
						{`Don't have an account? `}
						<a
							href="/auth/sign-up"
							className="text-blue-600 hover:text-blue-700">
							Sign up
						</a>
					</p>
					<p>
						By signing in, you agree to our{' '}
						<a href="#" className="text-blue-600 hover:text-blue-700">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="#" className="text-blue-600 hover:text-blue-700">
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
