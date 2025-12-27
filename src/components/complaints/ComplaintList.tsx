import { useState, useMemo } from 'react';
import { Complaint, ComplaintStatus, ComplaintPriority, ComplaintCategory } from '@/types';
import { ComplaintCard } from './ComplaintCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortAsc } from 'lucide-react';

interface ComplaintListProps {
  complaints: Complaint[];
  showCustomer?: boolean;
  showAgent?: boolean;
  emptyMessage?: string;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({
  complaints,
  showCustomer = false,
  showAgent = false,
  emptyMessage = 'No complaints found',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredComplaints = useMemo(() => {
    let result = [...complaints];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.complaintId.toLowerCase().includes(term) ||
          c.subject.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          c.policyNumber.toLowerCase().includes(term) ||
          c.customerName.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter((c) => c.priority === priorityFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((c) => c.category === categoryFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'priority':
          const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        default:
          return 0;
      }
    });

    return result;
  }, [complaints, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy]);

  const statuses: ComplaintStatus[] = ['Submitted', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
  const priorities: ComplaintPriority[] = ['Low', 'Medium', 'High', 'Critical'];
  const categories: ComplaintCategory[] = ['Claims', 'Policy Issues', 'Billing', 'Customer Service', 'Other'];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, subject, description, policy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              {priorities.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredComplaints.length} of {complaints.length} complaints
      </p>

      {/* Complaint cards */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              showCustomer={showCustomer}
              showAgent={showAgent}
            />
          ))}
        </div>
      )}
    </div>
  );
};
