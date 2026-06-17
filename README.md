## ☀️ Solar System 3D Simulation

An interactive, high-performance 3D Solar System simulation built with **Next.js (App Router)**, **React Three Fiber (R3F)**, and **Three.js**. This application brings celestial bodies to life with realistic coloring, custom shaders/glow effects, smooth orbital mechanics, and dynamic real-time target tracking.

---

## Key Features

- **Scientific & Visual Visual Accuracy:** Fixed typical planet rendering issues (such as identical Earth/Neptune palettes). Every celestial body utilizes precise, distinct color maps, roughness maps, and customized emissive intensities to capture true atmospheric characteristics.
- **Dynamic High-Intensity Lighting:** The Sun features a multilayered volumetric corona effect driven by continuous clock runtime scales, combined with a calibrated `pointLight` center to illuminate outer gas giants naturally.
- **Smart Selection Tracking (Pinpoint Dot Marker):** Selecting a planet automatically spawns an animated, pulsating neon pinpoint target marker directly above its polar axis. This avoids visual collision or confusion with Saturn's complex planetary ring structure.
- **Raycasting & Precision Hitboxes:** Built-in unrendered collision bounding spheres that scale dynamically with hovered bounds, ensuring zero-miss click interactions even for small, high-speed planets like Mercury.
- **Responsive Dual-Panel Dashboard:** Seamless context-aware layout featuring a left-side celestial toggle grid with custom CSS pulse indicators, and a right-side glassmorphic metrics panel rendering localized multilingual overviews and space statistics.

---

## Tech Stack & Architecture

- **Framework:** Next.js (App Router, Client Components)
- **3D Core:** Three.js via React Three Fiber
- **3D Helpers:** react-three/drei
- **Styling:** Tailwind CSS

---
