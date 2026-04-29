import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import BottomTabBar from './BottomTabBar';
import CartDrawer from './CartDrawer';

const Layout = () => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionRef = useRef(null);

    // Robust Sequential Transition Logic
    // Dependency is strictly location.pathname to avoid race conditions with displayLocation updates
    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            // Clear any pending transitions if user navigates again rapidly
            if (transitionRef.current) {
                clearTimeout(transitionRef.current.mid);
                clearTimeout(transitionRef.current.end);
            }

            setIsTransitioning(true);

            const timers = {
                mid: setTimeout(() => {
                    setDisplayLocation(location);
                    window.scrollTo(0, 0);
                }, 500),
                end: setTimeout(() => {
                    setIsTransitioning(false);
                }, 1200) // Slightly longer to ensure smooth receding
            };

            transitionRef.current = timers;

            return () => {
                // We do NOT clear of end timer on cleanup unless a NEW navigation starts
                // This prevents the "stuck" overlay bug caused by displayLocation updates
            };
        }
    }, [location.pathname]); // ONLY pathname to avoid re-triggering on internal state changes

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 selection:bg-blue-600 selection:text-white">
            <TopNav />
            {/* 3-stripe Transition Overlay - Bug Proofed */}
            <div className="fixed inset-0 z-[1000] pointer-events-none flex flex-col overflow-hidden">
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        className="flex-1 bg-gray-900 border-b border-white/5 transition-transform duration-800 ease-[cubic-bezier(0.87,0,0.13,1)]"
                        style={{
                            transform: isTransitioning ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: isTransitioning
                                ? (i % 2 === 0 ? 'left' : 'right')
                                : (i % 2 === 0 ? 'right' : 'left'),
                            transitionDelay: isTransitioning ? `${i * 100}ms` : `${(2 - i) * 100}ms`
                        }}
                    />
                ))}
            </div>

            {/* Main Content Area - Strictly Synchronized with Transition State */}
            <div className={`pt-20 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <main className="w-full pb-40 md:pb-0">
                    {/* Using displayLocation ensures that the previous page stays visible behind the transition bars */}
                    <Outlet context={{ location: displayLocation }} />
                </main>
            </div>

            <BottomTabBar />
            <CartDrawer />
        </div>
    );
};

export default Layout;
