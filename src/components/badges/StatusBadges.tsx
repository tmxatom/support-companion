import { ComplaintStatus, ComplaintPriority, ComplaintCategory } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig: Record<ComplaintStatus, { class: string; label: string }> = {
    'Submitted': { class: 'status-submitted', label: 'Submitted' },
    'Assigned': { class: 'status-assigned', label: 'Assigned' },
    'In Progress': { class: 'status-in-progress', label: 'In Progress' },
    'Resolved': { class: 'status-resolved', label: 'Resolved' },
    'Closed': { class: 'status-closed', label: 'Closed' },
  };

  const config = statusConfig[status];

  return (
    <Badge className={cn('font-medium', config.class, className)}>
      {config.label}
    </Badge>
  );
};

interface PriorityBadgeProps {
  priority: ComplaintPriority;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const priorityConfig: Record<ComplaintPriority, string> = {
    'Low': 'priority-low',
    'Medium': 'priority-medium',
    'High': 'priority-high',
    'Critical': 'priority-critical',
  };

  return (
    <Badge variant="outline" className={cn('font-medium border', priorityConfig[priority], className)}>
      {priority}
    </Badge>
  );
};

interface CategoryBadgeProps {
  category: ComplaintCategory;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className }) => {
  return (
    <Badge variant="secondary" className={cn('font-medium', className)}>
      {category}
    </Badge>
  );
};
