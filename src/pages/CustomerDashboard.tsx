import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ComplaintList } from '@/components/complaints/ComplaintList';
import { Button } from '@/components/ui/button';
import { getStats } from '@/data/mockData';
import { FileText, Clock, CheckCircle, AlertCircle, Plus, XCircle, Send } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'customer') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const customerComplaints = complaints.filter(
    (c) => c.customerId === user.id && !c.isArchived
  );
  const stats = getStats(customerComplaints);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your insurance complaints
            </p>
          </div>
          <Link to="/customer/new-complaint">
            <Button size="lg" className="gradient-accent gap-2">
              <Plus className="w-5 h-5" />
              New Complaint
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard title="Total" value={stats.total} icon={FileText} color="primary" />
          <StatCard title="Submitted" value={stats.submitted} icon={Send} color="primary" />
          <StatCard title="Assigned" value={stats.assigned} icon={Clock} color="warning" />
          <StatCard title="In Progress" value={stats.inProgress} icon={AlertCircle} color="warning" />
          <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="success" />
          <StatCard title="Closed" value={stats.closed} icon={XCircle} color="muted" />
        </div>

        {/* Complaints List */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-6">Your Complaints</h2>
          <ComplaintList
            complaints={customerComplaints}
            emptyMessage="You haven't submitted any complaints yet. Click 'New Complaint' to get started."
          />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
