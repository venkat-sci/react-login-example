import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link
        to="/"
        className="flex items-center hover:text-indigo-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-800 capitalize">
                {name.replace(/-/g, ' ')}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-indigo-600 transition-colors capitalize"
              >
                {name.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};