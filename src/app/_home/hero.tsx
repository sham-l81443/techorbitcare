"use client"
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
// import {  MapPinned } from 'lucide-react';
import { GoogleMapsIcon } from '@/assets/svg';
import Image from 'next/image';
import { HeroBackground } from './hero-background';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, CalendarPlus, Phone } from 'lucide-react';
import SWISSISSUE from '@/assets/images/techorbit-care-sw.png';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
// Background component for the hero section

// Carousel component for hero images
const HeroCarousel = () => {
    const carouselImages = [
        { src: SWISSISSUE, alt: 'TechOrbit Care Logo', title: 'Professional Mobile Repair', description: 'Expert mobile repair services' },
        { src: SWISSISSUE, alt: 'Battery Repair Service', title: 'Battery Replacement', description: 'Fast and reliable battery services' },
        { src: SWISSISSUE, alt: 'Screen Repair Service', title: 'Screen Repair', description: 'Professional screen replacement' },
        { src: SWISSISSUE, alt: 'Water Damage Repair', title: 'Water Damage Repair', description: 'Emergency water damage recovery' },
        { src: SWISSISSUE, alt: 'Charging Port Repair', title: 'Charging Port Repair', description: 'Quick charging port fixes' },
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true, 
            align: 'center',
            skipSnaps: false,
            dragFree: false,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(true);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    );

    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    );

    const toggleAutoplay = useCallback(() => {
        if (emblaApi) {
            const autoplay = emblaApi.plugins().autoplay as any;
            if (autoplay) {
                if (isPlaying) {
                    autoplay.stop();
                } else {
                    autoplay.play();
                }
                setIsPlaying(!isPlaying);
            }
        }
    }, [emblaApi, isPlaying]);

    useEffect(() => {
        if (!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        setSelectedIndex(emblaApi.selectedScrollSnap());

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="w-full relative group mb-12">
            {/* Main Carousel Container */}
            <div className="relative overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container flex">
                        {carouselImages.map((image, index) => (
                            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        className="object-cover object-center  h-full w-full"
                                        priority={index === 0}
                                    />
                                    {/* Overlay with content */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                {/* <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button> */}

                {/* Autoplay Toggle */}
                {/* <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg"
                    onClick={toggleAutoplay}
                >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button> */}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 space-x-2 absolute bottom-2  right-2">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === selectedIndex
                                ? 'bg-gray-500/70 scale-125'
                                : 'bg-gray-200/70 hover:bg-gray-400/70'
                        }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Header component for the main title and subtitle
const HeroHeader = () => {
    return (
        <>
            <h1 className="text-5xl md:text-7xl font-extralight text-black mb-6 leading-tight">
                {'Hassle-Free Mobile Repair'}
                <br />
                <span className="font-semibold text-6xl">{'We\'ve Got You Covered'}</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                {'Trusted by hundreds of customers for safe, reliable, and affordable mobile repair'}
            </p>
        </>
    );
};

// Actions component for the action buttons
const HeroActions = () => {
    return (
        <div className="flex flex-row sm:flex-row gap-4 justify-center items-center">
            <Link href="/complaints" className="w-full md:w-auto bg-black px-4 text-white flex items-center justify-center gap-3  py-2 border-2 border-black  rounded-full text-xs font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
               <CalendarPlus className='w-4 h-4'/> {'Book Now'}
            </Link>
            <Link href={`tel:${process.env.NEXT_PUBLIC_CALL_NUMBER || "+9020554466"}`} className="w-full md:w-auto border-2 border-black text-black py-2 px-4 rounded-full text-xs font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                <Phone className='w-4 h-4'/> {'Call Us Now'}
            </Link>
            {/* <Link target='_blank' href={`https://www.google.com/maps/place/Techorbit/@12.0373973,75.3622677,20.25z/data=!4m6!3m5!1s0x3ba43f9b82d9de85:0xdefe099aeb548748!8m2!3d12.0376313!4d75.3624648!16s%2Fg%2F11g1k8bwqk?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D`} className="w-full md:w-auto border-2 border-black text-black py-2 px-1  rounded-full text-xs font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"> */}
                {/* <Image src={GoogleMapsIcon} alt='Google Maps' className='w-6 h-6' /> */}
                {/* {'Show Us On Map'}
            </Link> */}
        </div>
    );
};

// Stats component for the statistics grid
const HeroStats = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
                <div className="text-3xl md:text-5xl font-light text-foreground mb-2">2.5K</div>
                <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">Repairs Complete</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-5xl font-light text-foreground mb-2">1.2K</div>
                <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">Happy Customers</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-5xl font-light text-foreground mb-2">5</div>
                <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-5xl font-light text-foreground mb-2">4.8</div>
                <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">Customer Rating</div>
            </div>
        </div>
    );
};



// Main Hero component that uses all the smaller components
const Hero = () => {
    return (
        <section className="lg:pb-10 bg-white -z-20 relative overflow-hidden ">
            <HeroBackground />
            <div className="mx-auto text-center !z-10">
                {/* <HeroHeader /> */}
                <HeroCarousel />
                <div className="px-6">
                <HeroActions />
                <HeroStats />
                </div>
            </div>
        </section>
    );
};

export default Hero;
