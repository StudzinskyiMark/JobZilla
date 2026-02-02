import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const session = await auth();

	if (!session?.user || !session.user.id) {
		return NextResponse.redirect(new URL('/auth/sign-in', request.url));
	}

	try {
		const data = await request.json();

		const newJob = await prisma.job.create({
			data: {
				...data,
				postedById: session.user.id,
			},
		});

		return NextResponse.json(newJob);
	} catch (error) {
		console.error('🚀 ---------------------------🚀');
		console.error('🚀 - POST - error:', error);
		console.error('🚀 ---------------------------🚀');

		return NextResponse.json(
			{ error: 'Failed to create job' },
			{ status: 500 },
		);
	}
}

export async function GET() {
	try {
		const jobs = await prisma.job.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
		return NextResponse.json(jobs);
	} catch (error) {
		console.error('🚀 ---------------------------🚀');
		console.error('🚀 - POST - error:', error);
		console.error('🚀 ---------------------------🚀');

		return NextResponse.json(
			{ error: 'Failed to get jobs' },
			{ status: 500 },
		);
	}
}
