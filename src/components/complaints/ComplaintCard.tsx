import { Link } from 'react-router-dom';
import { Complaint } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/badges/StatusBadges';
import { formatDistanceToNow } from 'date-fns';
import { Eye, MessageSquare, Calendar } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  showCustomer?: boolean;
  showAgent?: boolean;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  showCustomer = false,
  showAgent = false,
}) => {
  return (
    <Card className="hover:shadow-soft transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono font-medium">{complaint.complaintId}</span>
              <span>•</span>
              <CategoryBadge category={complaint.category} />
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {complaint.subject}
            </CardTitle>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {complaint.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {showCustomer && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Customer:</span>
              <span>{complaint.customerName}</span>
            </div>
          )}
          {showAgent && complaint.assignedToName && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Assigned to:</span>
              <span>{complaint.assignedToName}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</span>
          </div>
          {complaint.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{complaint.comments.length} comments</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Policy: <span className="font-mono">{complaint.policyNumber}</span>
          </span>
          <Link to={`/complaint/${complaint.id}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
