import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ComplaintList } from '@/components/complaints/ComplaintList';
import { getStats } from '@/data/mockData';
import { FileText, Clock, CheckCircle, AlertCircle, XCircle, Send } from 'lucide-react';

const AgentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'agent') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const assignedComplaints = complaints.filter(
    (c) => c.assignedTo === user.id && !c.isArchived
  );
  const stats = getStats(assignedComplaints);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome, {user.name}. Manage your assigned complaints.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard title="Total Assigned" value={stats.total} icon={FileText} color="primary" />
          <StatCard title="Submitted" value={stats.submitted} icon={Send} color="primary" />
          <StatCard title="Assigned" value={stats.assigned} icon={Clock} color="warning" />
          <StatCard title="In Progress" value={stats.inProgress} icon={AlertCircle} color="warning" />
          <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="success" />
          <StatCard title="Closed" value={stats.closed} icon={XCircle} color="muted" />
        </div>

        {/* Complaints List */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-6">Assigned Complaints</h2>
          <ComplaintList
            complaints={assignedComplaints}
            showCustomer
            emptyMessage="No complaints assigned to you yet."
          />
        </div>
      </div>
    </Layout>
  );
};

export default AgentDashboard;
