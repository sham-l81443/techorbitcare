import Link from 'next/link';
import React from 'react';
import { MapPin } from 'lucide-react';

const Hero = () => {

    return (
        <section className="pt-16 md:pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-light text-black mb-6 leading-tight">
                    {'Hassle-Free Mobile Repair'}
                    <br />
                    <span className="font-semibold">{' We’ve Got You Covered'}</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    {'Trusted by hundreds of customers for safe, reliable, and affordable mobile repair'}
                </p>

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                    {[
                        "5000+ Repairs Completed",
                        "Same Day Service",
                        "Lifetime Warranty"
                    ].map((point, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-black/60" />
                            <span className="text-black/60 font-medium">{point}</span>
                        </div>
                    ))}
                </div> */}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/complaints" className="w-full md:w-auto bg-black text-white px-8 py-2 border-2 border-black md:py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        {'Book Now'}
                    </Link>
                    <Link href={`tel:${process.env.NEXT_PUBLIC_CALL_NUMBER || "+9020554466"}`} className="w-full md:w-auto border-2 border-black text-black px-8 py-2 md:py-4 rounded-full text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
                        {'Call Us Now'}
                    </Link>
                    <Link target='_blank' href={`https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D`} className="w-full md:w-auto border-2 border-black text-black px-8 py-2 md:py-4 rounded-full text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                       <MapPin className='w-5 h-5' /> {'Show Us On Map'}
                    </Link>
                </div>
                {/* <div className='mt-5'>
                    📍 123 Tech Street, Electronics Hub, Mumbai | ⏰ Open Mon-Sat 9AM-8PM
                </div> */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 mt-20 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-light text-foreground mb-2">2.5K</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Repairs Complete</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-light text-foreground mb-2">1.2K</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Happy Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-light text-foreground mb-2">5</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-light text-foreground mb-2">4.8</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Customer Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
