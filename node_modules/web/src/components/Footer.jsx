import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Subscribed',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="astra-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-2xl font-bold tracking-tight mb-4 block">ASTRA</span>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Curated collections for the modern minimalist. Premium quality, timeless design.
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 block tracking-wide">Quick links</span>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 block tracking-wide">Connect</span>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 block tracking-wide">Newsletter</span>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background text-foreground"
                required
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-secondary-foreground/70">
            © 2026 ASTRA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;