'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Smartphone,
  Wrench,
  MessageCircle,
  Home,
  History,
  Plus,
  PhoneCall,
  MapPin as LocationIcon,
  Gift
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';
import { HeroBackground } from '@/app/_home/hero-background';
import Navbar from '../layout/navbar';

// Repair Registration Form Component
const RepairRegistrationForm = () => {
  const [formData, setFormData] = useState({
    deviceType: '',
    issue: '',
    description: '',
    contactNumber: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Repair request submitted successfully!');
    setFormData({
      deviceType: '',
      issue: '',
      description: '',
      contactNumber: '',
      address: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-500" />
          Register New Repair
        </CardTitle>
        <CardDescription>
          Fill out the form below to register your device for repair
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deviceType">Device Type</Label>
              <Select
                value={formData.deviceType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, deviceType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue">Issue Type</Label>
              <Select
                value={formData.issue}
                onValueChange={(value) => setFormData(prev => ({ ...prev, issue: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screen">Screen Repair</SelectItem>
                  <SelectItem value="battery">Battery Replacement</SelectItem>
                  <SelectItem value="water">Water Damage</SelectItem>
                  <SelectItem value="charging">Charging Port</SelectItem>
                  <SelectItem value="software">Software Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.contactNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Your address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              'Submit Repair Request'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Home Tab Content
const HomeTabContent = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section with Contact Info */}
      <Card className="bg-gray-50/80 border border-gray-200">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome to TechOrbit Care!</h2>
            <p className="text-gray-600">
              Your trusted partner for mobile device repairs. Get professional service with quick turnaround times.
            </p>
          </div>

          {/* Contact Information inside banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-md"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <PhoneCall className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Call Us</h4>
                <p className="text-sm text-gray-600">+91 98765 43210</p>
                <p className="text-xs text-gray-500">Mon-Sat: 9AM-7PM</p>
              </div>
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-md"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                <p className="text-sm text-gray-600">+91 98765 43210</p>
                <p className="text-xs text-gray-500">Quick support</p>
              </div>
            </a>

            <a
              href="https://maps.google.com/?q=Court+Road+Taliparamba+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-md"
            >
              <div className="p-2 bg-purple-100 rounded-lg">
                <LocationIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Visit Us</h4>
                <p className="text-sm text-gray-600">Court Road, Taliparamba</p>
                <p className="text-xs text-gray-500">Kerala, India</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Smartphone className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Screen Repair</h3>
            <p className="text-sm text-gray-600 mb-4">Professional screen replacement</p>
            <Button variant="outline" size="sm" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Wrench className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Battery Repair</h3>
            <p className="text-sm text-gray-600 mb-4">Battery replacement service</p>
            <Button variant="outline" size="sm" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get help & support</p>
            <Button variant="outline" size="sm" className="w-full">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Coupons Tab Content
const CouponsTabContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-500" />
            My Coupons
          </CardTitle>
          <CardDescription>
            View and manage your available coupons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No coupons available at the moment</p>
            <p className="text-sm text-gray-400 mt-2">Check back later for new offers!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Repair History Tab Content
const RepairHistoryTabContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-500" />
            Repair History
          </CardTitle>
          <CardDescription>
            Track your device repair history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No repair history found</p>
            <p className="text-sm text-gray-400 mt-2">Your repair requests will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main User Dashboard Component
export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Background */}
      <Navbar isLoggedIn={true} />
      <HeroBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-8 h-12 overflow-x-auto scrollbar-hide lg:grid lg:grid-cols-4 justify-start flex gap-x-4">
            <TabsTrigger value="home" className="flex items-center gap-2 text-sm font-medium py-2 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md">
              <Home className="h-4 w-4" />
              Home
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2 text-sm font-medium py-2 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md">
              <Plus className="h-4 w-4" />
              Register Repair
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2 text-sm font-medium py-2 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md">
              <Gift className="h-4 w-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 text-sm font-medium py-2 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeTabContent />
          </TabsContent>

          <TabsContent value="register">
            <div className="space-y-6">
              <RepairRegistrationForm />
            </div>
          </TabsContent>

          <TabsContent value="coupons">
            <CouponsTabContent />
          </TabsContent>

          <TabsContent value="history">
            <RepairHistoryTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
