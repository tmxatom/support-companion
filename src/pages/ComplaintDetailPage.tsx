import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import { ComplaintStatus } from '@/types';
import { Layout } from '@/components/layout/Layout';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/badges/StatusBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { getAgents } from '@/data/mockData';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Send,
  Clock,
  UserCog,
} from 'lucide-react';

const ComplaintDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { getComplaintById, updateComplaintStatus, assignComplaint, addComment } = useComplaints();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState<ComplaintStatus | ''>('');
  const [statusNotes, setStatusNotes] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const complaint = getComplaintById(id || '');
  const agents = getAgents();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!complaint || !user) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <p className="text-muted-foreground">Complaint not found.</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back
          </Link>
        </div>
      </Layout>
    );
  }

  const canUpdateStatus = user.role === 'agent' || user.role === 'manager';
  const canAssign = user.role === 'manager' && complaint.status === 'Submitted';
  const canComment = true; // All users can comment

  const statuses: ComplaintStatus[] = ['Submitted', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    
    setIsSubmitting(true);
    try {
      updateComplaintStatus(complaint.id, newStatus, user.id, user.name, statusNotes);
      toast({
        title: 'Status Updated',
        description: `Complaint status changed to ${newStatus}`,
      });
      setNewStatus('');
      setStatusNotes('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedAgent) return;
    
    const agent = agents.find((a) => a.id === selectedAgent);
    if (!agent) return;

    setIsSubmitting(true);
    try {
      assignComplaint(complaint.id, agent.id, agent.name, user.id, user.name);
      toast({
        title: 'Complaint Assigned',
        description: `Complaint assigned to ${agent.name}`,
      });
      setSelectedAgent('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to assign complaint.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      addComment(complaint.id, {
        userId: user.id,
        userName: user.name,
        text: newComment,
      });
      toast({
        title: 'Comment Added',
        description: 'Your comment has been posted.',
      });
      setNewComment('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBackPath = () => {
    switch (user.role) {
      case 'customer':
        return '/customer';
      case 'agent':
        return '/agent';
      case 'manager':
        return '/manager';
      default:
        return '/';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Link
          to={getBackPath()}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-muted-foreground">{complaint.complaintId}</p>
                    <CardTitle className="text-2xl">{complaint.subject}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <CategoryBadge category={complaint.category} />
                      <PriorityBadge priority={complaint.priority} />
                    </div>
                  </div>
                  <StatusBadge status={complaint.status} className="text-base px-4 py-1" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                  <p className="text-foreground whitespace-pre-wrap">{complaint.description}</p>
                </div>

                {complaint.resolution && (
                  <div className="p-4 rounded-lg bg-[hsl(var(--status-resolved))]/10 border border-[hsl(var(--status-resolved))]/20">
                    <h4 className="text-sm font-medium text-[hsl(var(--status-resolved))] mb-2">Resolution</h4>
                    <p className="text-foreground">{complaint.resolution}</p>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">{format(new Date(complaint.createdAt), 'PP')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Policy</p>
                      <p className="font-medium font-mono">{complaint.policyNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Customer</p>
                      <p className="font-medium">{complaint.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Assigned To</p>
                      <p className="font-medium">{complaint.assignedToName || 'Unassigned'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Status Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l-2 border-border space-y-6">
                  {complaint.statusHistory.map((entry, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-primary border-2 border-background" />
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <StatusBadge status={entry.status} />
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(entry.changedAt), 'PPp')}
                          </span>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">{entry.changedByName}</span>
                          {entry.notes && <span className="text-muted-foreground"> - {entry.notes}</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Comments ({complaint.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complaint.comments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No comments yet</p>
                ) : (
                  <div className="space-y-4">
                    {complaint.comments.map((comment) => (
                      <div key={comment.id} className="bg-secondary/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(comment.createdAt), 'PPp')}
                          </span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {canComment && (
                  <div className="pt-4 border-t border-border">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="mb-2"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isSubmitting}
                      className="gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Add Comment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-6">
            {/* Assign Agent (Manager only) */}
            {canAssign && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assign Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleAssign}
                    disabled={!selectedAgent || isSubmitting}
                    className="w-full"
                  >
                    Assign
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Update Status (Agent/Manager) */}
            {canUpdateStatus && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Update Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ComplaintStatus)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Add notes (optional)"
                    value={statusNotes}
                    onChange={(e) => setStatusNotes(e.target.value)}
                    rows={2}
                  />
                  <Button
                    onClick={handleStatusUpdate}
                    disabled={!newStatus || isSubmitting}
                    className="w-full"
                  >
                    Update Status
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complaint ID</span>
                  <span className="font-mono font-medium">{complaint.complaintId}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={complaint.status} />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <PriorityBadge priority={complaint.priority} />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <CategoryBadge category={complaint.category} />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{format(new Date(complaint.updatedAt), 'PP')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComplaintDetailPage;
