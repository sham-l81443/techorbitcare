"use client";
import { Menu, Smartphone, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
    DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { GoogleMapsIcon, Whatsapp } from "@/assets/svg";

// VisuallyHidden component for accessibility
const VisuallyHidden = ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        style={{
            position: 'absolute',
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            wordWrap: 'normal'
        }}
        {...props}
    >
        {children}
    </span>
);

// Logo component for the navbar
const NavbarLogo = () => {
    return (
        <Link
            href="/"
            className="flex flex-col justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="TechOrbitCare - Mobile Phone Repair Shop Homepage court road, Taliparamba, Kerala"
        >
            <span className="text-xl font-semibold text-foreground">
                Techorbit{" "}
                <span className="text-sm font-normal text-muted-foreground">care</span>
            </span>
            </Link>
    );
};

// Type definitions
interface NavigationItem {
    name: string;
    href: string;
    description: string;
}

interface ActionButton {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName: string;
    className: string;
    mobileText: string;
    ariaLabel: string;
    external?: boolean;
}

interface BusinessInfo {
    name: string;
    description: string;
    location: string;
    address: string;
    services: string[];
    experience: string;
}

// Navigation links component for desktop
const NavbarNavigation = ({ navigation, isActive }: { navigation: NavigationItem[], isActive: (path: string) => boolean }) => {
    return (
        <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    role="menuitem"
                    className={`text-[0.8125rem] font-medium transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                        }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-describedby={item.description ? `nav-${item.name.toLowerCase().replace(/\s+/g, '-')}` : undefined}
                >
                    {item.name}
                    {item.description && (
                        <span id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`} className="sr-only">
                            {item.description}
                        </span>
                    )}
                </Link>
            ))}
        </div>
    );
};

// Action buttons component for desktop
const NavbarActions = ({ actionButtons }: { actionButtons: ActionButton[] }) => {
    return (
        <div className="hidden md:flex items-center space-x-3">
            {actionButtons.map((button) => {
                const IconComponent = button.icon;
                return (
                    <Button
                        key={button.name}
                        variant="ghost"
                        size="icon"
                        asChild
                        className={button.className}
                    >
                        <a
                            href={button.href}
                            target={button.external ? "_blank" : undefined}
                            rel={button.external ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                            aria-label={button.ariaLabel || button.name}
                        >
                            {button.name === "Location" ? (
                                <Image src={GoogleMapsIcon} alt='Google Maps' className='w-5 h-5' />
                            ) : (
                                <IconComponent className={button.iconClassName} />
                            )}
                            <span className="sr-only">{button.name}</span>
                        </a>
                    </Button>
                );
            })}
            <Button asChild className="text-[0.8125rem] px-3 rounded-full h-8 font-medium cursor-pointer">
                <Link href="/login">LOGIN</Link>
            </Button>
        </div>
    );
};

const HeroLocation = () => {
    return (
        <Link target='_blank' href={`https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D`} className="text-center flex gap-2">
        <Image src={GoogleMapsIcon} alt='Google Maps' className='w-4 h-4' />
       </Link>
    );
};

// Mobile navigation drawer component
const NavbarMobile = ({ navigation, actionButtons, isActive }: { navigation: NavigationItem[], actionButtons: ActionButton[], isActive: (path: string) => boolean }) => {
    return (
        <div className="md:hidden">
            <Drawer direction="bottom">
                <div className="flex items-center gap-2">
                <HeroLocation />
                <DrawerTrigger asChild>
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open mobile navigation menu"
                        aria-expanded="false"
                        aria-controls="mobile-navigation"
                    >
                        <Menu className="w-5 h-5" />
                        <span className="sr-only">Menu</span>
                    </Button>
                </DrawerTrigger>
                </div>
                <DrawerContent className="min-h-[92vh] overflow-hidden flex flex-col bg-white" id="mobile-navigation" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
                    <VisuallyHidden>
                        <DrawerTitle id="mobile-menu-title ">
                            Mobile Navigation Menu - TechorbitCare Mobile Repair Shop
                        </DrawerTitle>
                    </VisuallyHidden>
                    <div className=" p-4 flex-1 overflow-y-auto">
                        <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                            {navigation.map((item) => (
                                <DrawerClose key={item.name} asChild>
                                    <Link
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isActive(item.href)
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                            }`}
                                        aria-current={isActive(item.href) ? "page" : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                </DrawerClose>
                            ))}
                            <DrawerClose asChild>
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                                >
                                    Login
                                </Link>
                            </DrawerClose>
                        </nav>
                    </div>

                    <div className="px-4 py-3 space-y-3">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Location</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                               {process.env.NEXT_PUBLIC_ADDRESS || "Near Police Station, Court Road, Taliparamba, Kerala"}
                            </p>
                        </div>
                        <div className="flex justify-between space-x-2">
                            {actionButtons.map((button) => {
                                const IconComponent = button.icon;
                                let mobileClassName = "";

                                if (button.name === "Call Now") {
                                    mobileClassName = "flex-1 justify-center bg-blue-100 text-blue-600 hover:border-blue-300";
                                } else if (button.name === "WhatsApp") {
                                    mobileClassName = "flex-1 justify-center bg-green-100 text-green-600 hover:border-green-300";
                                } else if (button.name === "Location") {
                                    mobileClassName = "flex-1 justify-center bg-purple-100 text-purple-600 hover:border-purple-300";
                                }

                                return (
                                    <DrawerClose key={button.name} asChild>
                                        <Button
                                            variant="outline"
                                            className={mobileClassName}
                                            asChild
                                        >
                                            <a
                                                href={button.href}
                                                target={button.external ? "_blank" : undefined}
                                                rel={button.external ? "noopener noreferrer" : undefined}
                                                className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                                aria-label={button.ariaLabel || button.name}
                                                >
                                                    {button.name === "WhatsApp" ? (
                                                    <Image src={Whatsapp} alt="WhatsApp" width={20} height={20} className="mr-2" />
                                                    
                                                ) :
                                               
                                                button.name === "Location" ? (
                                                    <Image src={GoogleMapsIcon} alt="Location" width={20} height={20} className="mr-2" />
                                                ) :
                                                 (
                                                    <IconComponent className="w-5 h-5 mr-2" />
                                                )}
                                                <span className="text-xs">
                                                    {button.mobileText}
                                                </span>
                                            </a>
                                        </Button>
                                    </DrawerClose>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-4 py-3 border-t bg-muted/30">
                        <p className="text-xs text-muted-foreground text-center">
                            © 2024 TechorbitCare. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground text-center mt-1">
                            Mobile Repair Services • Taliparamba, Kerala
                        </p>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

// Structured data component for SEO
const NavbarStructuredData = ({ businessInfo }: { businessInfo: BusinessInfo }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": businessInfo.name,
                    "description": businessInfo.description,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": businessInfo.address,
                        "addressLocality": "Taliparamba",
                        "addressRegion": "Kerala",
                        "addressCountry": "IN"
                    },
                    "telephone": process.env.NEXT_PUBLIC_CALL_NUMBER || "+919020554466",
                    "url": "https://techorbitcare.com",
                    "priceRange": "$$",
                    "serviceArea": {
                        "@type": "GeoCircle",
                        "geoMidpoint": {
                            "@type": "GeoCoordinates",
                            "latitude": 12.0376,
                            "longitude": 75.3625
                        },
                        "geoRadius": "12000"
                    },
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Mobile Repair Services",
                        "itemListElement": businessInfo.services.map((service: string, index: number) => ({
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": service
                            },
                            "position": index + 1
                        }))
                    },
                    "foundingDate": "2009",
                    "slogan": "Your trusted mobile repair partner for 15+ years"
                })
            }}
        />
    );
};

const Navbar = () => {
    const location = usePathname();

    const navigation = [
        {
            name: "Home",
            href: "/",
            description: "TechOrbitCare mobile repair shop homepage"
        },
        {
            name: "Mobile Repair Services",
            href: "/services",
            description: "Professional mobile phone repair services for all brands"
        },
        {
            name: "About Us",
            href: "/about",
            description: "Learn about our 15+ years of mobile repair experience"
        },
        {
            name: "Repair Request",
            href: "/repair",
            description: "Submit your mobile phone repair request online"
        },
        {
            name: "Contact & Support",
            href: "/support",
            description: "Get help and contact our mobile repair experts"
        },
    ];

    const actionButtons = [
        {
            name: "Call Now",
            href: `tel:${process.env.NEXT_PUBLIC_CALL_NUMBER || "+9020664466"}`,
            icon: Smartphone,
            iconClassName: "!w-5 !h-5",
            className: "text-blue-600 h-8 w-8",
            mobileText: "Call Now",
            ariaLabel: "Call TechorbitCare mobile repair shop",
        },
        {
            name: "WhatsApp",
            href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9020664466"}`,
            icon: WhatsAppIcon,
            iconClassName: "!w-6 !h-6",
            className: " h-8 w-8",
            mobileText: "WhatsApp",
            external: true,
            ariaLabel: "Contact TechorbitCare on WhatsApp for mobile repair",
        },
        {
            name: "Location",
            href: "https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D",
            icon: GoogleMapsIcon,
            iconClassName: "!w-5 !h-5",
            className: " text-purple-600 h-8 w-8",
            mobileText: "Location",
            external: true,
            ariaLabel: "Find TechorbitCare location on Google Maps",
        },
    ];

    // Business information for structured data
    const businessInfo = {
        name: "TechOrbitCare",
        description: "Professional mobile phone repair shop with 15+ years of experience",
        location: "Taliparamba, Kerala",
        address: "Near Court Road, Taliparamba, Kerala",
        services: ["Mobile Phone Repair", "Smartphone Repair", "Keypad Phone Repair", "Screen Repair", "Battery Replacement", "Software Issues"],
        experience: "15+ years",
    };

    const isActive = (path: string) => location === path;

    return (
        <>
            {/* Skip Navigation Links for Accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
            >
                Skip to main content
            </a>

            {/* Promotional Banner */}
            {/* <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white text-center py-1.5 px-2 sm:px-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium">
                        🎉 Get ₹200 OFF on your first mobile repair service!
                    </span>
                    <span className="text-[0.75rem] sm:text-[0.8125rem] bg-white/20 px-2 py-0.5 sm:py-1 rounded-full">
                        Min. ₹500
                    </span>
                </div>
            </div> */}

            {/* Structured Data for SEO */}
            <NavbarStructuredData businessInfo={businessInfo} />

            <header role="banner" className="z-50 ">
                <nav
                    className="w-full bg-transparent backdrop-blur-md border-b border-border/40"
                    role="navigation"
                    aria-label="Main navigation z-50"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-12">
                            <NavbarLogo />
                            <NavbarNavigation navigation={navigation} isActive={isActive} />
                            <NavbarActions actionButtons={actionButtons} />
                            <NavbarMobile navigation={navigation} actionButtons={actionButtons} isActive={isActive} />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;