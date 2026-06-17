'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

const BASE: Transition = { repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }

const float = (y: number[], duration: number, delay = 0) => ({
    animate: { y },
    transition: { ...BASE, duration, delay },
})

const sway = (rotate: number[], duration: number, delay = 0) => ({
    animate: { rotate },
    transition: { ...BASE, duration, delay },
})

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' } satisfies Transition,
})

export default function MobileBabyShowerInvite() {
    return (
        /* h-[100dvh] is crucial for mobile web to prevent the bottom from
          being cut off by Safari/Chrome URL bars.
        */
        <div className="relative w-full h-[100dvh] bg-[#fdfdfc] overflow-hidden flex flex-col items-center justify-center select-none">

            {/* --- BACKGROUND WATERCOLORS --- */}
            <Image
                src="/images/light_green_waterdrop.png"
                alt=""
                width={400}
                height={400}
                className="absolute top-[-5%] left-[-25%] w-[85%] opacity-35 pointer-events-none"
            />
            <Image
                src="/images/light_blue_waterdrop.png"
                alt=""
                width={400}
                height={400}
                className="absolute top-[25%] right-[-15%] w-[65%] opacity-25 pointer-events-none"
            />
            <Image
                src="/images/light_green_waterdrop.png"
                alt=""
                width={400}
                height={400}
                className="absolute bottom-[2%] left-[10%] w-[75%] opacity-30 pointer-events-none rotate-[170deg]"
            />

            {/* --- TOP DECORATIONS --- */}
            <motion.div className="absolute top-0 left-0 w-full z-10" {...sway([-1, 1, -1], 5)}>
                <Image src="/images/banner.png" alt="" width={500} height={150} className="w-full h-auto object-contain" priority />
            </motion.div>

            <motion.div className="absolute top-[3%] left-[-8%] w-[40%] z-20" {...sway([-3, 3, -3], 6)}>
                <Image src="/images/leaf.png" alt="" width={200} height={300} className="w-full h-auto object-contain" />
            </motion.div>

            <motion.div className="absolute top-[3%] right-[-8%] w-[40%] z-20 scale-x-[-1]" {...sway([3, -3, 3], 6, 1)}>
                <Image src="/images/leaf.png" alt="" width={200} height={300} className="w-full h-auto object-contain" />
            </motion.div>

            <motion.div
                className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[45%] max-w-[200px] z-30"
                {...float([0, -12, 0], 4)}
            >
                <Image src="/images/panda_in_ballon.png" alt="Panda in hot air balloon" width={300} height={400} className="w-full h-auto object-contain" priority />
            </motion.div>

            {/* --- TYPOGRAPHY & CONTENT --- */}
            {/* Using vh/vw for margins and clamp() ensures the text dynamically
        shrinks/grows perfectly based on the mobile device's screen size.
      */}
            <div className="absolute z-30 flex flex-col items-center text-center w-[90%] top-[35%]">

                <motion.p {...fadeUp(0.1)} className="font-[family-name:var(--font-dancing)] text-[#8c6d4b] text-[clamp(1rem,5vw,1.5rem)] mb-1">
                    Please join us for a
                </motion.p>

                <motion.h1 {...fadeUp(0.2)} className="font-[family-name:var(--font-playfair)] text-[#365744] text-[clamp(2.5rem,12vw,4.5rem)] font-extrabold tracking-widest leading-none">
                    BABY
                </motion.h1>

                <motion.h2 {...fadeUp(0.3)} className="font-[family-name:var(--font-dancing)] text-[#a8825c] text-[clamp(3.5rem,14vw,5rem)] -mt-[2%] mb-[2%]">
                    Shower
                </motion.h2>

                <motion.p {...fadeUp(0.4)} className="font-[family-name:var(--font-dancing)] text-[#8c6d4b] text-[clamp(1.1rem,5.5vw,1.5rem)] mb-3">
                    Honoring Priya Patel
                </motion.p>

                {/* Date Row */}
                <motion.div {...fadeUp(0.5)} className="flex items-center justify-center w-[90%] my-1">
                    <div className="h-px bg-[#a37c58] flex-1 opacity-50"></div>
                    <div className="px-3 flex items-center space-x-3 text-[#5c5c5c] font-[family-name:var(--font-lato)]">
                        <span className="text-[clamp(0.6rem,2.5vw,0.8rem)] font-bold tracking-widest">SUNDAY</span>
                        <div className="flex flex-col items-center">
                            <span className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,8vw,3rem)] font-bold text-[#8c6d4b] leading-none">09</span>
                            <span className="text-[clamp(0.5rem,2vw,0.6rem)] font-bold tracking-widest mt-1">AUGUST</span>
                        </div>
                        <span className="text-[clamp(0.6rem,2.5vw,0.8rem)] font-bold tracking-widest">AT 10:00 AM</span>
                    </div>
                    <div className="h-px bg-[#a37c58] flex-1 opacity-50"></div>
                </motion.div>

                {/* Details Row */}
                <motion.div {...fadeUp(0.6)} className="mt-4 flex flex-col gap-3 text-[clamp(0.65rem,3vw,0.85rem)] text-[#5c5c5c] font-[family-name:var(--font-lato)] w-full text-left px-2">
                    <div className="flex items-start gap-2 justify-center">
                        <span className="mt-[2px]">📞</span>
                        <p className="leading-snug max-w-[220px]">RSVP to Umangini at 361-944-8671 or Dolly at 361-461-3755</p>
                    </div>
                    <div className="flex items-start gap-2 justify-center">
                        <span className="mt-[2px]">📍</span>
                        <p className="leading-snug max-w-[220px]">Portland Community Center:<br/>2000 Billy G Webb Dr, Portland, Tx</p>
                    </div>
                </motion.div>

                {/* QR Code Row */}
                <motion.div {...fadeUp(0.7)} className="mt-5 flex items-center gap-3">
                    <div className="flex flex-col items-center p-1">
                        <QRCodeSVG value="https://www.amazon.com/baby" size={45} bgColor="transparent" fgColor="#365744" />
                        <span className="text-[8px] text-[#5c5c5c] mt-1 uppercase tracking-wider font-bold">Scan Me</span>
                    </div>
                    <span className="font-[family-name:var(--font-dancing)] text-[#8c6d4b] text-[clamp(1rem,4.5vw,1.3rem)]">
            Registered at Amazon
          </span>
                </motion.div>
            </div>

            {/* --- BOTTOM DECORATIONS --- */}
            <motion.div className="absolute bottom-[-1%] left-[-4%] w-[28%] max-w-[140px] z-40" {...float([0, -8, 0], 4.5, 0.2)}>
                <Image src="/images/box_baby.png" alt="" width={200} height={200} className="w-full h-auto object-contain" />
            </motion.div>

            <motion.div className="absolute top-[45%] right-[-6%] w-[25%] max-w-[120px] z-20" {...sway([-3, 3, -3], 5.5, 0.5)}>
                <Image src="/images/baby_cloths.png" alt="" width={150} height={200} className="w-full h-auto object-contain" />
            </motion.div>

            <motion.div className="absolute bottom-[16%] right-[-2%] w-[26%] max-w-[130px] z-10" {...float([0, -10, 0], 3.5, 0.8)}>
                <Image src="/images/ballons.png" alt="" width={150} height={200} className="w-full h-auto object-contain" />
            </motion.div>

            <motion.div className="absolute bottom-[-2%] right-[4%] w-[22%] max-w-[110px] z-40" {...float([0, -5, 0], 5, 1)}>
                <Image src="/images/gift_box.png" alt="" width={150} height={150} className="w-full h-auto object-contain" />
            </motion.div>

            <motion.div className="absolute bottom-[-3%] left-[15%] w-[50%] max-w-[250px] z-20" {...float([0, -4, 0], 6, 0.5)}>
                <Image src="/images/rainbow.png" alt="" width={300} height={150} className="w-full h-auto object-contain" />
            </motion.div>

        </div>
    )
}
