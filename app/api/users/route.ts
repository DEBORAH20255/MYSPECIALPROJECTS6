import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/redis-client';
import { User } from '@/types/api';

// Mock user data - in a real app, this would come from a database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    createdAt: '2024-01-10T09:15:00Z',
    lastLogin: '2024-01-19T16:45:00Z'
  },
  {
    id: '3',
    email: 'bob.wilson@example.com',
    createdAt: '2024-01-05T11:20:00Z',
    lastLogin: '2024-01-18T13:30:00Z'
  },
  {
    id: '4',
    email: 'alice.johnson@example.com',
    createdAt: '2024-01-12T08:45:00Z',
    lastLogin: '2024-01-21T10:15:00Z'
  },
  {
    id: '5',
    email: 'charlie.brown@example.com',
    createdAt: '2024-01-08T15:30:00Z',
    lastLogin: '2024-01-17T12:00:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const sessionToken = request.cookies.get('session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify session exists in Redis
    const userEmail = await getSession(sessionToken);
    if (!userEmail) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Filter users based on search term
    let filteredUsers = mockUsers;
    if (search) {
      filteredUsers = mockUsers.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json({
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit
    });

  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}