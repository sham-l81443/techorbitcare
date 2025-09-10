import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Battery,
  Droplets,
  Camera,
  Wifi,
  Settings,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

import { BatteryRepair, ChargingPortRepair, ScreenRepair, SoftwareRepair, SpeakerRepair, WaterDamageRepair } from "@/assets/images";

const services = [
  {
    icon: Smartphone,
    title: "Screen Replacement",
    description: "Cracked or damaged screens replaced with genuine OEM parts",
    price: "Starting from ₹2,999",
    popular: true,
    image: ScreenRepair
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Restore your device's battery life with premium batteries",
    price: "Starting from ₹1,999",
    popular: false,
    image: BatteryRepair
  },
  {
    icon: Droplets,
    title: "Water Damage Repair",
    description: "Professional water damage restoration and cleaning",
    price: "Starting from ₹3,999",
    popular: false,
    image: WaterDamageRepair
  },
  {
    icon: Camera,
    title: "Camera Issues",
    description: "Fix camera malfunctions, focus issues, and lens problems",
    price: "Starting from ₹2,499",
    popular: false,
    image: ChargingPortRepair
  },
  {
    icon: Wifi,
    title: "Charging Port Repair",
    description: "Solve charging problems and port connectivity issues",
    price: "Starting from ₹1,799",
    popular: false,
    image: SpeakerRepair
  },
  {
    icon: Settings,
    title: "Software Issues",
    description: "OS updates, software bugs, and performance optimization",
    price: "Starting from ₹999",
    popular: false,
    image: SoftwareRepair
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Complete Mobile Repair Solutions
          </h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto">
            From screen replacements to complex motherboard repairs,
            we handle all your mobile device needs with expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl group relative overflow-hidden bg-gray-50"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
                  Popular
                </div>
              )}

              {/* Service Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-x-4">
                  <div className="min-h-12 min-w-12 max-h-12 max-w-12 mt-0.5 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                    {/* <p className="text-lg font-semibold text-primary">
                    {service.price}
                    </p> */}
                  </div>
                </div>




                <Button variant="ghost" className="w-full group-hover:bg-primary/5">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;