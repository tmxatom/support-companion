import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ComplaintList } from '@/components/complaints/ComplaintList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStats, getAgents } from '@/data/mockData';
import { FileText, Clock, CheckCircle, AlertCircle, Users, XCircle, Send } from 'lucide-react';

const ManagerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'manager') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const allComplaints = complaints.filter((c) => !c.isArchived);
  const stats = getStats(allComplaints);
  const agents = getAgents();

  // Calculate agent stats
  const agentStats = agents.map((agent) => {
    const agentComplaints = complaints.filter((c) => c.assignedTo === agent.id && !c.isArchived);
    return {
      ...agent,
      total: agentComplaints.length,
      resolved: agentComplaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length,
      pending: agentComplaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Closed').length,
    };
  });

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manager Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome, {user.name}. Overview of all complaints and agents.
          </p>
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

        {/* Agent Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Agent Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {agentStats.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-4 rounded-lg border border-border bg-secondary/30 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.email}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-primary">{agent.total}</p>
                        <p className="text-muted-foreground">Total</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-[hsl(var(--status-assigned))]">{agent.pending}</p>
                        <p className="text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-[hsl(var(--status-resolved))]">{agent.resolved}</p>
                        <p className="text-muted-foreground">Resolved</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Complaints */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-6">All Complaints</h2>
          <ComplaintList
            complaints={allComplaints}
            showCustomer
            showAgent
            emptyMessage="No complaints in the system."
          />
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
