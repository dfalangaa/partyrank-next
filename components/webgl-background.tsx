"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * PARTY scene: animated gradient bg + faceted disco ball + falling 3D confetti.
 * Reacts to mouse + scroll.
 *
 * Disabled on mobile/touch devices — it both kills battery and breaks the
 * "feels like a native app" pretense we go for on small screens.
 */
export function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Respect prefers-reduced-motion — show a static painted gradient instead
    // of spinning the whole disco-ball + confetti scene for users who asked
    // for less motion.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      mount.style.background =
        "radial-gradient(ellipse at 30% 20%, rgba(192,132,252,0.45), transparent 55%)," +
        "radial-gradient(ellipse at 70% 60%, rgba(244,114,182,0.4), transparent 60%)," +
        "radial-gradient(ellipse at 40% 90%, rgba(251,146,60,0.35), transparent 65%)," +
        "#080214";
      return;
    }

    // Same scene runs everywhere now — same visual identity on desktop and
    // mobile. We dial down pixel ratio + confetti count later in the scene
    // setup when the viewport is narrow, but the disco-ball + drifting
    // gradient is the brand and shouldn't disappear on phones.

    // ============ RENDERER ============
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    const renderer = new THREE.WebGLRenderer({
      // Antialiasing is the heaviest hit on phone GPUs — skip it there.
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
    // Phones already have high DPR; capping at 1 keeps the scene smooth
    // without visibly hurting the gradient/disco-ball look.
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.75),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x080214, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ============ BG SHADER (orthographic full-screen) ============
    const bgUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };
    const bgScene = new THREE.Scene();
    const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    bgScene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: bgUniforms,
          vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
          fragmentShader: /* glsl */ `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uMouse;
            uniform float uScroll;

            // simplex noise
            vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            float snoise(vec2 v){
              const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
              vec2 i=floor(v+dot(v,C.yy));
              vec2 x0=v-i+dot(i,C.xx);
              vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
              vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
              i=mod(i,289.0);
              vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
              vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
              m=m*m; m=m*m;
              vec3 x=2.0*fract(p*C.www)-1.0;
              vec3 h=abs(x)-0.5;
              vec3 ox=floor(x+0.5);
              vec3 a0=x-ox;
              m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
              vec3 g;
              g.x=a0.x*x0.x+h.x*x0.y;
              g.yz=a0.yz*x12.xz+h.yz*x12.yw;
              return 130.0*dot(m,g);
            }

            void main(){
              vec2 uv = vUv;
              float t = uTime * 0.06;
              vec2 mo = (uMouse - 0.5) * 0.1;

              float n1 = snoise(uv*2.2 + vec2(t, t*0.7) + mo);
              float n2 = snoise(uv*3.5 - vec2(t*0.5, t*1.1));
              float n3 = snoise(uv*1.2 + vec2(-t*0.3, t*0.2));

              vec3 bg = mix(vec3(0.02,0.01,0.06), vec3(0.05,0.025,0.10), uv.y);
              vec3 cV = vec3(0.55,0.30,1.00);
              vec3 cP = vec3(1.00,0.30,0.60);
              vec3 cC = vec3(0.20,0.85,1.00);
              vec3 cA = vec3(1.00,0.65,0.20);

              vec3 col = bg;
              col = mix(col, cV, smoothstep(-0.2,0.6,n1)*0.5);
              col = mix(col, cP, smoothstep(-0.3,0.7,n2)*0.4);
              col = mix(col, cC, smoothstep(-0.1,0.5,n3)*0.3);
              float tr = smoothstep(0.6,1.0,uv.x) * smoothstep(0.6,1.0,uv.y);
              col = mix(col, cA, tr*0.12);

              float g = fract(sin(dot(uv*1000.0+t, vec2(12.9898,78.233)))*43758.5453);
              col += (g-0.5)*0.03;

              float v = smoothstep(0.95,0.2,length(uv-0.5));
              col *= 0.55 + v*0.45;

              gl_FragColor = vec4(col, 1.0);
            }
          `,
        })
      )
    );

    // ============ MAIN 3D SCENE ============
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // -------- DISCO BALL (silver, real-looking) --------
    // IcosahedronGeometry → non-indexed for true flat facets.
    // Silver base with brightness variance per facet + subtle color tints
    // (faint pink/cyan/violet) to mimic ambient party lights reflecting off mirrors.
    const ballGeom = new THREE.IcosahedronGeometry(1.4, 3).toNonIndexed();
    const positionCount = ballGeom.attributes.position.count;
    const colorAttr = new Float32Array(positionCount * 3);
    const facetCount = positionCount / 3;

    // Faint party light tints — most facets stay silver-ish, ~20% pick up a tint
    const tints = [
      [1.0, 0.85, 0.95], // faint pink
      [0.85, 0.85, 1.0], // faint violet
      [0.85, 0.95, 1.0], // faint cyan
      [1.0, 0.95, 0.85], // faint amber
    ];

    for (let f = 0; f < facetCount; f++) {
      // Silver base — bright neutral gray
      let r = 0.92, g = 0.92, b = 0.96;

      // 25% chance of catching a colored party light reflection
      if (Math.random() < 0.25) {
        const t = tints[Math.floor(Math.random() * tints.length)];
        r *= t[0]; g *= t[1]; b *= t[2];
      }

      // Brightness variance — high contrast like a real disco ball
      const roll = Math.random();
      let brightness;
      if (roll < 0.12) brightness = 1.8 + Math.random() * 0.4;       // hotspot ~12%
      else if (roll < 0.40) brightness = 1.1 + Math.random() * 0.4;  // bright ~28%
      else if (roll < 0.78) brightness = 0.55 + Math.random() * 0.35; // mid ~38%
      else brightness = 0.18 + Math.random() * 0.20;                  // dark ~22%

      for (let v = 0; v < 3; v++) {
        const idx = (f * 3 + v) * 3;
        colorAttr[idx] = Math.min(2.0, r * brightness);
        colorAttr[idx + 1] = Math.min(2.0, g * brightness);
        colorAttr[idx + 2] = Math.min(2.0, b * brightness);
      }
    }
    ballGeom.setAttribute("color", new THREE.BufferAttribute(colorAttr, 3));

    // Per-facet seed for animated sparkle (1 value per facet, applied to all 3 verts)
    const seedArr = new Float32Array(facetCount);
    for (let f = 0; f < facetCount; f++) seedArr[f] = Math.random();
    // Save base brightness too
    const baseBrightnessArr = new Float32Array(facetCount);
    for (let f = 0; f < facetCount; f++) {
      // pull from r channel (silver, all channels similar)
      baseBrightnessArr[f] = colorAttr[f * 9];
    }

    const ballMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      toneMapped: false,
      transparent: true,
    });
    const ball = new THREE.Mesh(ballGeom, ballMat);
    const isDesktop = window.innerWidth / window.innerHeight > 1;
    // Smaller, further right so it doesn't collide with content
    const baseBallX = isDesktop ? 3.6 : 1.2;
    const baseBallY = isDesktop ? 1.0 : 0.6;
    const baseBallScale = isDesktop ? 0.7 : 0.55;
    ball.position.set(baseBallX, baseBallY, 0);
    ball.scale.setScalar(baseBallScale);
    scene.add(ball);

    // Wireframe overlay (the dark "grout lines" between mirror tiles of a real disco ball)
    const wireGeom = new THREE.IcosahedronGeometry(1.41, 3);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x0a0a14,
      transparent: true,
      opacity: 0.85,
    });
    const wireEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(wireGeom),
      wireMat
    );
    ball.add(wireEdges); // attach to ball so it rotates together

    // Silver chain/rope above
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 3, 6),
      new THREE.MeshBasicMaterial({
        color: 0xa8a8b8,
        transparent: true,
        opacity: 0.6,
        toneMapped: false,
      })
    );
    rope.position.set(baseBallX, baseBallY + 2.5 * baseBallScale, 0);
    scene.add(rope);

    // -------- CONFETTI --------
    // Roughly half the confetti on mobile — the instanced mesh draw call is
    // cheap but each particle still does a per-frame matrix update.
    const CONFETTI_COUNT = isMobile ? 110 : 220;
    const cGeom = new THREE.PlaneGeometry(0.12, 0.04);
    const cMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
    });
    const confetti = new THREE.InstancedMesh(cGeom, cMat, CONFETTI_COUNT);
    confetti.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const confettiColors = [
      0xff3ea5, 0x9b4dff, 0x22d3ee, 0xf59e0b, 0xffffff,
      0xf472b6, 0x10d390, 0xff7e29,
    ].map((c) => new THREE.Color(c));

    type ConfData = {
      x: number; y: number; z: number;
      vx: number; vy: number;
      rx: number; ry: number; rz: number;
      wx: number; wy: number; wz: number;
      scale: number;
    };
    const cData: ConfData[] = [];
    const dummy = new THREE.Object3D();
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const d: ConfData = {
        x: (Math.random() - 0.5) * 16,
        y: Math.random() * 14 + 2,
        z: (Math.random() - 0.5) * 5 - 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.6 - Math.random() * 1.0,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        wx: (Math.random() - 0.5) * 3,
        wy: (Math.random() - 0.5) * 3,
        wz: (Math.random() - 0.5) * 3,
        scale: 0.6 + Math.random() * 1.4,
      };
      cData.push(d);
      confetti.setColorAt(
        i,
        confettiColors[Math.floor(Math.random() * confettiColors.length)]
      );
    }
    confetti.instanceColor!.needsUpdate = true;
    scene.add(confetti);

    // ============ INTERACTION ============
    let targetRX = 0, targetRY = 0;
    let rX = 0, rY = 0;
    let scrollY = 0;
    const onMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      bgUniforms.uMouse.value.set(x, 1 - y);
      targetRX = (y - 0.5) * 0.4;
      targetRY = (x - 0.5) * 0.6;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      bgUniforms.uScroll.value = scrollY;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ============ ANIMATION LOOP ============
    const start = performance.now();
    let raf: number;
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      bgUniforms.uTime.value = t;

      // Disco ball: spin + gentle bobbing + scroll parallax
      rX += (targetRX - rX) * 0.06;
      rY += (targetRY - rY) * 0.06;
      ball.rotation.x = rX;
      ball.rotation.y = rY + t * 0.7;
      ball.position.y = baseBallY + Math.sin(t * 0.6) * 0.12 - scrollY * 0.003;
      ball.position.x = baseBallX - scrollY * 0.001;
      rope.position.y = ball.position.y + 2.5 * baseBallScale;
      rope.position.x = ball.position.x;

      // Fade ball out as we scroll past the hero (so it doesn't compete with content)
      const heroH = window.innerHeight;
      const fade = Math.max(0, 1 - scrollY / (heroH * 0.7));
      ballMat.opacity = fade;
      wireMat.opacity = fade * 0.85;
      (rope.material as THREE.MeshBasicMaterial).opacity = fade * 0.6;
      ball.visible = fade > 0.01;
      rope.visible = fade > 0.01;

      // Random sparkle: every few frames, refresh ~3% of facets with bright flash
      if (Math.floor(t * 30) !== Math.floor((t - 0.033) * 30)) {
        for (let f = 0; f < facetCount; f++) {
          if (Math.random() < 0.012) {
            const flash = 1.6 + Math.random() * 0.6;
            for (let v = 0; v < 3; v++) {
              const idx = (f * 3 + v) * 3;
              colorAttr[idx] = Math.min(2.0, 0.95 * flash);
              colorAttr[idx + 1] = Math.min(2.0, 0.95 * flash);
              colorAttr[idx + 2] = Math.min(2.0, 0.98 * flash);
            }
          } else if (Math.random() < 0.012) {
            // restore to baseline
            const b = baseBrightnessArr[f];
            for (let v = 0; v < 3; v++) {
              const idx = (f * 3 + v) * 3;
              colorAttr[idx] = b;
              colorAttr[idx + 1] = b;
              colorAttr[idx + 2] = Math.min(2.0, b * 1.05);
            }
          }
        }
        ballGeom.attributes.color.needsUpdate = true;
      }

      // Confetti
      for (let i = 0; i < CONFETTI_COUNT; i++) {
        const d = cData[i];
        d.y += d.vy * 0.03;
        d.x += d.vx * 0.03;
        d.rx += d.wx * 0.02;
        d.ry += d.wy * 0.02;
        d.rz += d.wz * 0.02;
        if (d.y < -8) {
          d.y = 8 + Math.random() * 4;
          d.x = (Math.random() - 0.5) * 16;
          d.z = (Math.random() - 0.5) * 5 - 1;
        }
        dummy.position.set(d.x, d.y - scrollY * 0.0018, d.z);
        dummy.rotation.set(d.rx, d.ry, d.rz);
        dummy.scale.setScalar(d.scale);
        dummy.updateMatrix();
        confetti.setMatrixAt(i, dummy.matrix);
      }
      confetti.instanceMatrix.needsUpdate = true;

      // Render bg, then clear depth (NOT color), then render 3D scene on top
      renderer.autoClear = true;
      renderer.render(bgScene, bgCam);
      renderer.clearDepth();
      renderer.autoClear = false;
      renderer.render(scene, camera);
      renderer.autoClear = true;

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      ballGeom.dispose();
      ballMat.dispose();
      cGeom.dispose();
      cMat.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
