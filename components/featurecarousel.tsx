'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FeaturesCarouselProps {
  features?: Feature[];
  className?: string;
  buttonLinks?: string[]; // New prop for read more button links
}

const defaultFeatures: Feature[] = [
  {
    id: 1,
    title: "24/7 IT Support",
    description: "Around-the-clock monitoring and troubleshooting.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "End-to-End Solution",
    description: "Covers all aspects of IT, from consulting and planning",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Airbirds",
    description: "Advanced security measures like firewalls, encryption,",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&crop=face"
  },
  {
    id: 4,
    title: "Enhanced Cybersecurity",
    description: "Access to scalable cloud-based services for storage",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Hiking",
    description: "Tailored IT solutions designed to meet specific business needs.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Cloud Integration",
    description: "Around-the-clock monitoring and troubleshooting.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
  }
];

const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({
  features = defaultFeatures,
  className = "",
  buttonLinks = []
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const cardWidth = 320;
  const cardGap = 24;
  const cardFullWidth = cardWidth + cardGap;

  // Infinite loop data
  const infiniteFeatures = [...features, ...features, ...features];
  const totalWidth = infiniteFeatures.length * cardFullWidth;
  const singleSetWidth = features.length * cardFullWidth;

  const xWrapped = useTransform(x, (value) => {
    const wrappedValue = ((value % singleSetWidth) + singleSetWidth) % singleSetWidth;
    return -singleSetWidth + wrappedValue;
  });

  // Smooth physics on drag end
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    setIsDragging(false);

    const currentX = x.get();
    const velocity = info.velocity.x;

    let targetX = currentX + velocity * 0.15;

    const cardIndex = Math.round(targetX / cardFullWidth);
    targetX = cardIndex * cardFullWidth;

    animate(x, targetX, {
      type: "spring",
      stiffness: 180,
      damping: 20,
      restDelta: 0.001
    });
  };

  // Center a clicked card
  const handleCardClick = (index: number) => {
    if (isDragging) return;
    const middleIndex = Math.floor(features.length / 2);
    const offset = (index % features.length) - middleIndex;
    animate(x, x.get() - offset * cardFullWidth, {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  return (
    <section className={`py-16 bg-gray-50 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-gray-600 mb-2 tracking-wide uppercase">Our Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Reliable IT for Unstoppable Growth
          </h2>
        </motion.div>

        <div
          className="relative overflow-hidden mx-auto"
          ref={constraintsRef}
          style={{
            width: '100%',
            maxWidth: '1200px',
            perspective: '1000px'
          }}
        >
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            style={{
              x: xWrapped,
              width: totalWidth,
              transformStyle: 'preserve-3d'
            }}
            drag="x"
            dragConstraints={{ left: -Infinity, right: Infinity }}
            dragElastic={0.1}
            dragMomentum={true}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
          >
            {infiniteFeatures.map((feature: Feature, index: number) => {
              const cardPosition = useTransform(
                xWrapped,
                (x) => {
                  const cardX = index * cardFullWidth + x;
                  const viewportCenter = 600;
                  return cardX + cardWidth / 2 - viewportCenter;
                }
              );

              const rotateY = useTransform(cardPosition, [-600, -300, 0, 300, 600], [45, 20, 0, -20, -45]);
              const scale = useTransform(cardPosition, [-600, -300, 0, 300, 600], [0.7, 0.85, 1, 0.85, 0.7]);
              const z = useTransform(cardPosition, [-600, -300, 0, 300, 600], [-200, -100, 0, -100, -200]);
              const opacity = useTransform(cardPosition, [-800, -400, 0, 400, 800], [0.3, 0.7, 1, 0.7, 0.3]);

              return (
                <motion.div
                  key={`${feature.id}-${index}`}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300"
                  style={{
                    rotateY,
                    scale,
                    z,
                    opacity,
                    transformOrigin: 'center center',
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>
                    <a
                      href={buttonLinks[index % buttonLinks.length] || '#'}
                      className="px-5 py-2 text-sm font-medium rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.7)] bg-gray-50 text-gray-800 transition-all hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.7)]"
                    >
                      Read More
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <motion.span animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }}>←</motion.span>
            Drag to explore more features
            <motion.span animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }}>→</motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
