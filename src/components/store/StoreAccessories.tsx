import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

import wheelRaw from '../../data/images/store/accessories/wheel.png';
import userPanelRaw from '../../data/images/store/accessories/user-panel.png';
import smartIotRaw from '../../data/images/store/accessories/smart-iot.png';
import doorLockRaw from '../../data/images/store/accessories/door-lock.png';
import lightSwitchRaw from '../../data/images/store/accessories/light-switch.png';
import flameLightRaw from '../../data/images/store/accessories/flame-proof-light.png';
import ledSquareRaw from '../../data/images/store/accessories/led-light-square.png';
import ledRoundRaw from '../../data/images/store/accessories/led-light-round.png';
import mantrapRaw from '../../data/images/store/accessories/mantrap-alarm.png';
import tBarRaw from '../../data/images/store/accessories/t-bar-flooring.png';
import stripCurtainsRaw from '../../data/images/store/accessories/strip-curtains.jpg';
import confootRaw from '../../data/images/store/accessories/confoot.png';
import checkeredRaw from '../../data/images/store/accessories/checkered-plate.png';
import acPaintRaw from '../../data/images/store/accessories/ac-paint.png';
import isoMaleRaw from '../../data/images/store/accessories/iso-power-plug-male.png';
import isoFemaleRaw from '../../data/images/store/accessories/iso-power-plug-female.png';
import rackRaw from '../../data/images/store/accessories/rack.png';
import rampRaw from '../../data/images/store/accessories/ramp.png';
import heaterRaw from '../../data/images/store/accessories/heater.png';
import dehumidifierRaw from '../../data/images/store/accessories/dehumidifier.png';
import customLogoRaw from '../../data/images/store/accessories/customized-logo.png';

const s = (r: unknown) => typeof r === 'string' ? r : (r as any).src;

const products = [
  {
    name: 'High-Quality Wheel',
    desc: 'Provides mobility for containers or storage units, enabling easy repositioning or transport.',
    img: s(wheelRaw),
  },
  {
    name: 'User Panel',
    desc: 'A simple, intuitive control panel that lets operators monitor and manage refrigeration units with ease.',
    img: s(userPanelRaw),
  },
  {
    name: 'Smart IoT',
    desc: 'An intelligent monitoring system that tracks your cold-chain assets in real time for precise, uninterrupted temperature control.',
    img: s(smartIotRaw),
  },
  {
    name: 'Door Lock',
    desc: 'A sturdy, auto-lock plate designed for smooth, secure opening and closing of container doors.',
    img: s(doorLockRaw),
  },
  {
    name: 'Light Switch',
    desc: 'A simple, durable switch that powers interior lighting for clear visibility inside the container.',
    img: s(lightSwitchRaw),
  },
  {
    name: 'Flame Proof Light',
    desc: 'A safety-rated lighting unit built to operate reliably in hazardous environments where ignition risks must be minimized.',
    img: s(flameLightRaw),
  },
  {
    name: 'LED Light — Square',
    desc: 'A bright, energy-efficient square LED light that enhances visibility inside containers.',
    img: s(ledSquareRaw),
  },
  {
    name: 'LED Light — Round',
    desc: 'A compact round LED light offering clear, uniform illumination for safer operations.',
    img: s(ledRoundRaw),
  },
  {
    name: 'Mantrap Alarm',
    desc: 'A safety alert device that lets a trapped person trigger an immediate alarm for quick rescue.',
    img: s(mantrapRaw),
  },
  {
    name: 'T-Bar Flooring',
    desc: 'A reinforced flooring solution that improves load-bearing strength and durability.',
    img: s(tBarRaw),
  },
  {
    name: 'Strip Curtains',
    desc: 'Flexible PVC curtains that help maintain temperature and reduce energy loss during frequent door openings.',
    img: s(stripCurtainsRaw),
  },
  {
    name: 'Confoot',
    desc: 'A lightweight, portable container support system that lets you safely load and unload containers without heavy equipment.',
    img: s(confootRaw),
  },
  {
    name: 'Checkered Plate',
    desc: 'A textured metal plating accessory used for anti-slip flooring and structural mobility.',
    img: s(checkeredRaw),
  },
  {
    name: 'AC Paint',
    desc: 'A high-quality coating that shields your containers with a clean, corrosion-resistant finish built to withstand tough conditions.',
    img: s(acPaintRaw),
  },
  {
    name: 'ISO Power Plug Male',
    desc: 'An ISO-standardized plug accessory for standardized connectivity and safety.',
    img: s(isoMaleRaw),
  },
  {
    name: 'ISO Power Plug Female',
    desc: 'An ISO-standardized female plug accessory for electrical and connection compliance.',
    img: s(isoFemaleRaw),
  },
  {
    name: 'Rack',
    desc: 'A durable storage rack designed to organize and secure goods efficiently inside the container.',
    img: s(rackRaw),
  },
  {
    name: 'Ramp',
    desc: 'Durable rubber-wheel parts designed to improve stability, safety, and long-lasting performance for your equipment.',
    img: s(rampRaw),
  },
  {
    name: 'Heater',
    desc: 'A dependable heating unit that maintains optimal temperatures to protect sensitive cargo in cold conditions.',
    img: s(heaterRaw),
  },
  {
    name: 'Dehumidifier',
    desc: 'A moisture-control unit that keeps containers dry and protects cargo from humidity damage.',
    img: s(dehumidifierRaw),
  },
  {
    name: 'Customized Logo',
    desc: 'A custom branding option where you can feature your brand on containers through paint or durable stickers.',
    img: s(customLogoRaw),
  },
];

const StoreAccessories: React.FC = () => {
  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,40,84,0.9)_0%,rgba(15,40,84,0.7)_30%,rgba(15,40,84,0.35)_55%,transparent_78%)] z-10" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-20"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-4 block">
            Store · Accessories
          </motion.span>
          <div className="border-l-[3px] border-accent pl-6 md:pl-8">
            <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary mb-6 max-w-3xl">
              <CharReveal text={tc('Cold Storage Accessories')} />
            </h1>
            <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/65 font-medium max-w-xl mb-8 leading-relaxed">
              Designed for reliability and high performance, our accessories perfectly support your operational and logistics needs.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button variant="primary" size="lg" href="/contact">
                Order your accessories <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-primary py-16 px-6 md:px-12 border-b border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:pt-1">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">Overview</span>
            <span className="font-heading font-extrabold text-h4 text-secondary/60 tracking-tight">About</span>
          </motion.div>
          <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/70 font-medium leading-[1.7] max-w-3xl">
            Crystal Group supplies 24+ accessories designed to complete and upgrade cold storage and container setups. From temperature-maintaining PVC strip curtains and smart IoT monitoring devices to industrial lighting, flooring systems, and safety alarms — every component is sourced for cold-chain durability.
          </motion.p>
        </motion.div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">All products</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-primary border-b border-primary/10 pb-1.5 w-full">
              <CharReveal text="Accessories" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <motion.div
                key={p.name}
                variants={itemVariants}
                className="group bg-primary border border-primary/10 flex flex-col overflow-hidden hover:border-accent/40 transition-all duration-300"
              >
                <div className="aspect-square bg-primary/5 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1.5 flex-1">
                  <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.12em] text-secondary leading-tight">{p.name}</span>
                  <p className="font-body text-[11px] text-secondary/55 leading-snug">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <div>
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary block mb-2">
                Get a quote
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-secondary mb-3">
                Need accessories for your setup?
              </motion.h2>
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 font-medium leading-relaxed max-w-lg">
                Tell us what you need and we'll source and supply. Available pan-India.
              </motion.p>
            </div>
            <motion.div variants={itemVariants} className="shrink-0">
              <Button variant="primary" size="lg" href="/contact">
                Request a quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default StoreAccessories;
