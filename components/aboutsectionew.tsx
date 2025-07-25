'use client';
import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  const MotionComponent = motion(Component as any);

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
        'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
        '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  rotationFactor?: number;
  isRevese?: boolean;
  springOptions?: any;
};

function Tilt({
  children,
  className,
  rotationFactor = 15,
  isRevese = false,
  springOptions,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = mouseX / width - 0.5;
    const yPos = mouseY / height - 0.5;

    const rotateX = -(yPos * rotationFactor) * (isRevese ? -1 : 1);
    const rotateY = (xPos * rotationFactor) * (isRevese ? -1 : 1);

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        ...springOptions,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

interface AboutSectionProps {
  name?: string;
  designation?: string;
  description?: string;
  imageUrl?: string;
}

function AboutSection({
  name = "Divya C Senan",
  designation = "Project Director",
  description = "Under Dr. Senan's leadership, the lab drives impactful research in sustainability education, inclusive pedagogy, and digital innovation—mentoring scholars, shaping policy, and building global academic collaborations with measurable community outcomes.",
  imageUrl = "./senanprofile.JPG"
}: AboutSectionProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="lg:max-w-6xl sm:w-[100vw] lg:w-full">
        <Tilt
          rotationFactor={8}
          isRevese={false}
          springOptions={{
            stiffness: 260,
            damping: 20,
          }}
          className="group"
        >
          <motion.div
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image Section */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative w-80 h-80 mx-auto">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  
                  {/* Image container */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-300 to-yellow-500 rounded-full opacity-60"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-orange-300 to-yellow-500 rounded-full opacity-40"
                    animate={{
                      y: [0, 15, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="space-y-4 "
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Name */}
                <div className="space-y-2">
                  <TextShimmer
                    as="h1"
                    className="text-4xl md:text-5xl font-bold text-foreground"
                    duration={3}
                  >
                    {name}
                  </TextShimmer>
                  
                  <motion.div
                    className="w-36 items-center px-4 py-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-full mt-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <p className="text-sm font-medium text-black">
                      {designation}
                    </p>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {description}
                </motion.p>

                {/* Stats or additional info */}
                <motion.div
                  className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="text-center p-4 bg-muted/50 rounded-xl border border-border/50 ">
                    <div className="text-2xl font-bold text-foreground">20+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-xl border border-border/50">
                    <div className="text-2xl font-bold text-foreground">15+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.a href="mailto:divyacsenan@keralauniversity.ac.in"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-orange-300 to-yellow-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Get in touch
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </div>
  );
}

export default AboutSection;
