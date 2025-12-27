import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, FileText, Clock, CheckCircle, ArrowRight, Users, Headset, BarChart3 } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      title: 'Submit Complaints',
      description: 'Easily file complaints with all necessary details including policy number, category, and priority.',
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your complaint status in real-time with detailed timeline and status updates.',
    },
    {
      icon: Headset,
      title: 'Dedicated Support',
      description: 'Our support agents are assigned to handle your complaints with utmost priority.',
    },
    {
      icon: CheckCircle,
      title: 'Quick Resolution',
      description: 'We strive to resolve all complaints within the stipulated time frame.',
    },
  ];

  const stats = [
    { value: '95%', label: 'Resolution Rate' },
    { value: '24hrs', label: 'Avg Response Time' },
    { value: '10,000+', label: 'Complaints Resolved' },
    { value: '4.8/5', label: 'Customer Rating' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight">
                Grievance
                <span className="block text-accent-foreground/90">Redressal Portal</span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 max-w-lg">
                Your trusted platform for submitting and tracking insurance complaints. 
                We are committed to resolving your concerns with transparency and efficiency.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-accent h-12 px-8 text-lg">
                    Register Complaint
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-8 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Track Status
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block animate-slide-up">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Customer support team"
                  className="rounded-2xl shadow-floating"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--status-resolved))]/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--status-resolved))]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">95%</p>
                      <p className="text-sm text-muted-foreground">Issues Resolved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              How We Help You
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Our comprehensive complaint management system ensures your concerns are addressed promptly and effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
            Need to Register a Complaint?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            If you wish to raise a concern or register a grievance, please provide us your details and we would be happy to assist you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gradient-accent h-12 px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="h-12 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Already Registered? Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Portal Access
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Different dashboards for different roles to manage complaints effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elevated transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit complaints, track status, and communicate with support agents.
                </p>
                <Link to="/register">
                  <Button variant="outline" className="w-full">Register as Customer</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elevated transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Headset className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Agents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View assigned complaints, update status, and resolve customer issues.
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full">Agent Login</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elevated transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Managers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Oversee all complaints, assign agents, and view analytics.
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full">Manager Login</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
