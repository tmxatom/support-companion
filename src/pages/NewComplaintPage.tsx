import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import { ComplaintCategory, ComplaintPriority } from '@/types';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewComplaintPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    policyNumber: '',
    category: '' as ComplaintCategory | '',
    priority: '' as ComplaintPriority | '',
    subject: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'customer') {
      navigate('/login');
    }
    // Pre-fill policy number if available
    if (user?.policyNumber) {
      setFormData((prev) => ({ ...prev, policyNumber: user.policyNumber || '' }));
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const categories: ComplaintCategory[] = ['Claims', 'Policy Issues', 'Billing', 'Customer Service', 'Other'];
  const priorities: ComplaintPriority[] = ['Low', 'Medium', 'High', 'Critical'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.priority) {
      toast({
        title: 'Missing Fields',
        description: 'Please select both category and priority.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newComplaint = addComplaint({
        customerId: user.id,
        customerName: user.name,
        policyNumber: formData.policyNumber,
        category: formData.category as ComplaintCategory,
        priority: formData.priority as ComplaintPriority,
        status: 'Submitted',
        subject: formData.subject,
        description: formData.description,
      });

      toast({
        title: 'Complaint Submitted',
        description: `Your complaint has been registered with ID: ${newComplaint.complaintId}`,
      });

      navigate('/customer');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit complaint. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        {/* Back Button */}
        <Link to="/customer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card className="shadow-elevated">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Register Your Grievance</CardTitle>
              <CardDescription className="mt-2">
                If you wish to raise a concern or register a grievance, please provide us your details and we would be happy to assist you.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Policy Number */}
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number *</Label>
                <Input
                  id="policyNumber"
                  type="text"
                  placeholder="e.g., POL-2024-001234"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              {/* Category and Priority */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as ComplaintCategory })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value as ComplaintPriority })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject / Title *</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Brief summary of your complaint"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your issue in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/customer')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gradient-accent"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Submit Complaint
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewComplaintPage;
