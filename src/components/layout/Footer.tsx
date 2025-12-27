import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-hero">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">SUD Life Insurance</h3>
              <p className="text-xs text-muted-foreground">Complaint Tracking System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SUD Life Insurance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
