import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchUsers } from '../services/api';
import { useAuthStore } from '../store/authStore';
import type { User } from '../types/auth';
import { Breadcrumb } from '../components/Breadcrumb';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <Breadcrumb />
        
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white overflow-hidden shadow rounded-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/dashboard/user/${user.id}`)}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}