import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-ink-400 mb-6" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-ink-300" />}
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="hover:text-forest-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-forest-600 font-medium' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
