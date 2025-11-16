import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  
  // Don't show breadcrumbs on the home page
  if (location.pathname === '/') return null;
  
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <nav className="py-3 px-4 bg-gray-50">
      <ol className="container mx-auto flex flex-wrap items-center text-sm">
        <li>
          <Link to="/" className="text-primary-blue hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-700 capitalize">
                  {name.replace('-', ' ')}
                </span>
              ) : (
                <Link to={routeTo} className="text-primary-blue hover:underline capitalize">
                  {name.replace('-', ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;