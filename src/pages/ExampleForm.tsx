import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { useErrorStore } from '../store/errorStore';
import { Breadcrumb } from '../components/Breadcrumb';

export default function ExampleForm() {
  const { formData, isSubmitting, updateField, validateField, submitForm } = useFormStore();
  const { errors } = useErrorStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleBlur = async (field: keyof typeof formData) => {
    await validateField(field);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumb />
        
        <div className="mt-6 bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}