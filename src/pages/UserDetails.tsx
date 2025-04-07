import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchUserDetails } from '../services/api';
import type { User } from '../types/auth';
import { Breadcrumb } from '../components/Breadcrumb';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserDetails(id!);
        setUser(data);
      } catch (error) {
        toast.error('Failed to load user details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumb />
        
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>

        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="h-24 w-24 rounded-full"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.first_name} {user.last_name}
                </h1>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    San Francisco, CA
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}