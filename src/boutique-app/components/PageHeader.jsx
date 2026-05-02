import { Link } from 'react-router-dom';

export default function PageHeader({ title, breadcrumb, children }) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <nav className="flex items-center gap-1 mt-1 text-sm text-gray-500">
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              <span className={i === crumbs.length - 1 ? 'text-rose-500 font-medium' : ''}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
