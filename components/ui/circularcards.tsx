import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

// ------------------ UTILITIES ------------------
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = "bold 14px monospace",
  color: string = "black",
  maxWidth?: number
): { texture: Texture; width: number; height: number } {
  const dpr = window.devicePixelRatio || 1; // Handle high DPI
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");

  context.font = font;
  let textToRender = text;

  // Word wrapping logic
  if (maxWidth) {
    const words = text.split(" ");
    let line = "";
    let lines: string[] = [];
    for (let w of words) {
      const testLine = line + w + " ";
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        lines.push(line.trim());
        line = w + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    textToRender = lines.join("\n");
  }

  const metrics = context.measureText(textToRender);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);

  // High DPI canvas
  canvas.width = (textWidth + 20) * dpr;
  canvas.height = (textHeight + 20) * dpr;

  context.scale(dpr, dpr); // Scale drawing for retina
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);

  const lines = textToRender.split("\n");
  lines.forEach((line, i) => {
    context.fillText(
      line,
      (canvas.width / dpr) / 2,
      (canvas.height / dpr) / 2 + (i - (lines.length - 1) / 2) * fontSize
    );
  });

  // Create smoother texture
  const texture = new Texture(gl, {
    generateMipmaps: true,  // Enable mipmaps for smooth scaling
    minFilter: gl.LINEAR_MIPMAP_LINEAR,
    magFilter: gl.LINEAR
  });
  texture.image = canvas;

  return { texture, width: canvas.width / dpr, height: canvas.height / dpr };
}


// ------------------ TITLE CLASS ------------------
interface TitleProps {
  gl: GL;
  parent: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
  maxWidth?: number;
}

class Title {
  gl: GL;
  parent: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({
    gl,
    parent,
    renderer,
    text,
    textColor = "#545050",
    font = "bold 14px Figtree",
    maxWidth,
  }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.parent = parent;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh(maxWidth);
  }

  createMesh(maxWidth?: number) {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
      maxWidth
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });

    const aspect = width / height;
    const textHeightScaled = this.parent.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;

    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = -this.parent.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;

    this.mesh.setParent(this.parent);
  }
}

// ------------------ MEDIA CLASS ------------------
interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text?: string;
  buttonLabel?: string;
  slug?: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text?: string;
  buttonLabel?: string;
  slug?: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;

  program!: Program;
  plane!: Mesh;
  title?: Title;
  buttonMesh?: Mesh;

  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    buttonLabel,
    slug,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.buttonLabel = buttonLabel;
    this.slug = slug;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.createButton();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    if (this.text) {
      this.title = new Title({
        gl: this.gl,
        parent: this.plane,
        renderer: this.renderer,
        text: this.text,
        textColor: this.textColor,
        font: this.font || "bold 14px Figtree",
        maxWidth: 200,
      });
    }
  }

  createButton() {
    if (this.buttonLabel) {
      const { texture, width, height } = createTextTexture(
        this.gl,
        this.buttonLabel,
        "bold 12px Figtree",
        this.textColor, // Use the same text color as other text
        150
      );
      
      const geometry = new Plane(this.gl);
      const program = new Program(this.gl, {
        vertex: `
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uHover;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            // Slight scale effect on hover
            p.xy *= 1.0 + uHover * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform sampler2D tMap;
          uniform float uHover;
          varying vec2 vUv;
          
          void main() {
            vec4 textColor = texture2D(tMap, vUv);
            
            // Simple text rendering with hover effect
            vec3 finalTextColor = mix(textColor.rgb, textColor.rgb * 1.2, uHover);
            vec4 finalColor = vec4(finalTextColor, textColor.a);
            
            if (finalColor.a < 0.1) discard;
            gl_FragColor = finalColor;
          }
        `,
        uniforms: { 
          tMap: { value: texture },
          uHover: { value: 0 }
        },
        transparent: true,
      });
      
      this.buttonMesh = new Mesh(this.gl, { geometry, program });
      
      const aspect = width / height;
      const buttonHeightScaled = this.plane.scale.y * 0.15;
      const buttonWidthScaled = Math.max(buttonHeightScaled * aspect, buttonHeightScaled * 2); // Minimum width

      this.buttonMesh.scale.set(buttonWidthScaled, buttonHeightScaled, 1);
      
      const yOffset = this.title
        ? this.title.mesh.position.y - this.title.mesh.scale.y * 0.5 - buttonHeightScaled * 0.5 - 0.02
        : -this.plane.scale.y * 0.5 - buttonHeightScaled * 0.5 - 0.08;

      this.buttonMesh.position.y = yOffset;
      this.buttonMesh.setParent(this.plane);
    }
  }

  // Get button bounds in screen space for hit testing
  getButtonBounds() {
    if (!this.buttonMesh) return null;
  
    // Extract world position from worldMatrix
    const m = this.buttonMesh.worldMatrix;
    const worldPos = {
      x: m[12],
      y: m[13],
      z: m[14]
    };
  
    // Convert world to NDC
    const ndcX = worldPos.x / (this.viewport.width / 2);
    const ndcY = worldPos.y / (this.viewport.height / 2);
  
    // NDC → screen coords
    const screenX = ((ndcX + 1) / 2) * this.screen.width;
    const screenY = ((1 - ndcY) / 2) * this.screen.height;
  
    // Convert button size to screen space
    const screenWidth = (this.buttonMesh.scale.x / this.viewport.width) * this.screen.width;
    const screenHeight = (this.buttonMesh.scale.y / this.viewport.height) * this.screen.height;
  
    const padding = 20;
    const finalWidth = Math.max(screenWidth + padding, 80);
    const finalHeight = Math.max(screenHeight + padding, 50);
  
    return {
      left: screenX - finalWidth / 2,
      right: screenX + finalWidth / 2,
      top: screenY - finalHeight / 2,
      bottom: screenY + finalHeight / 2
    };
  }
  

  // Set button hover state
  setButtonHover(isHover: boolean) {
    if (this.buttonMesh && this.buttonMesh.program.uniforms.uHover) {
      this.buttonMesh.program.uniforms.uHover.value = isHover ? 1 : 0;
    }
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

// ------------------ APP CLASS ------------------
interface AppConfig {
  items?: { image: string; text?: string; buttonLabel?: string; slug?: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  onCheckDebounce: (...args: any[]) => void;

  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: { image: string; text?: string; buttonLabel?: string; slug?: string }[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;

  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;
  boundOnCanvasClick!: (e: MouseEvent) => void;
  boundOnCanvasTouchEnd!: (e: TouchEvent) => void;
  boundOnCanvasMouseMove!: (e: MouseEvent) => void;

  isDown: boolean = false;
  start: number = 0;
  currentHoveredMedia: Media | null = null;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 14px Figtree",
      scrollSpeed = 2,
      scrollEase = 0.05,
    }: AppConfig
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);

    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(1, 1, 1, 1);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(
    items: { image: string; text?: string; buttonLabel?: string; slug?: string }[] | undefined,
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string
  ) {
    const galleryItems = items && items.length ? items : [];
    this.mediasImages = galleryItems.concat(galleryItems);

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        buttonLabel: data.buttonLabel ?? "Read more",
        slug: data.slug,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  handleButtonClick(pointerX: number, pointerY: number): boolean {
    let clicked = false;

    // Always reset hover before checking
    if (this.currentHoveredMedia) {
      this.currentHoveredMedia.setButtonHover(false);
      this.currentHoveredMedia = null;
    }

    for (const media of this.medias) {
      if (!media.buttonMesh || !media.slug) continue;

      const bounds = media.getButtonBounds();
      if (!bounds) continue;

      const inside = (
        pointerX >= bounds.left &&
        pointerX <= bounds.right &&
        pointerY >= bounds.top &&
        pointerY <= bounds.bottom
      );

      if (inside) {
        console.log(`✅ Button clicked: media ${media.index}, slug=${media.slug}`);
        window.location.href = `/news/${media.slug}`;
        clicked = true;
        break; // stop after the first matching button
      }
    }

    if (!clicked) console.log("No button clicked");
    return clicked;
  }

  handleMouseMove(pointerX: number, pointerY: number) {
    let foundHover = false;
    
    for (const media of this.medias) {
      if (media.isBefore || media.isAfter || !media.buttonMesh) continue;
      
      const bounds = media.getButtonBounds();
      if (!bounds) continue;
      
      const isHovering = pointerX >= bounds.left && 
                        pointerX <= bounds.right && 
                        pointerY >= bounds.top && 
                        pointerY <= bounds.bottom;
      
      if (isHovering) {
        if (this.currentHoveredMedia !== media) {
          // Clear previous hover
          if (this.currentHoveredMedia) {
            this.currentHoveredMedia.setButtonHover(false);
          }
          // Set new hover
          media.setButtonHover(true);
          this.currentHoveredMedia = media;
          foundHover = true;
          break;
        } else {
          foundHover = true;
        }
      }
    }
    
    // Clear hover if no button is being hovered
    if (!foundHover && this.currentHoveredMedia) {
      this.currentHoveredMedia.setButtonHover(false);
      this.currentHoveredMedia = null;
    }
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
    this.scroll.target += delta > 0 ? this.scrollSpeed : -this.scrollSpeed;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias.length) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  onCanvasClick(e: MouseEvent) {
    if (!this.renderer?.gl?.canvas) return;
    
    // Prevent event from bubbling
    e.preventDefault();
    e.stopPropagation();
    
    const rect = (this.renderer.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.handleButtonClick(x, y);
  }

  onCanvasTouchEnd(e: TouchEvent) {
    if (!this.renderer?.gl?.canvas) return;
    
    // Prevent event from bubbling
    e.preventDefault();
    e.stopPropagation();
    
    const rect = (this.renderer.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const t = e.changedTouches[0];
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    
    this.handleButtonClick(x, y);
  }

  onCanvasMouseMove(e: MouseEvent) {
    if (!this.renderer?.gl?.canvas) return;
    const rect = (this.renderer.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.handleMouseMove(x, y);
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnCanvasClick = this.onCanvasClick.bind(this);
    this.boundOnCanvasTouchEnd = this.onCanvasTouchEnd.bind(this);
    this.boundOnCanvasMouseMove = this.onCanvasMouseMove.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);

    const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
    canvas.addEventListener("click", this.boundOnCanvasClick);
    canvas.addEventListener("touchend", this.boundOnCanvasTouchEnd);
    canvas.addEventListener("mousemove", this.boundOnCanvasMouseMove);
    canvas.style.cursor = "pointer";
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);

    const canvas = this.renderer?.gl?.canvas as HTMLCanvasElement | undefined;
    if (canvas) {
      canvas.removeEventListener("click", this.boundOnCanvasClick);
      canvas.removeEventListener("touchend", this.boundOnCanvasTouchEnd);
      canvas.removeEventListener("mousemove", this.boundOnCanvasMouseMove);
    }

    if (this.renderer?.gl?.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

// ------------------ CIRCULAR GALLERY COMPONENT ------------------
interface CircularGalleryPropsone {
  items?: { image: string; text?: string; buttonLabel?: string; slug?: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallerytwo({
  items,
  bend = 3,
  textColor = "#000000",
  borderRadius = 0.05,
  font = "12px",
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryPropsone) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const isMobile = window.innerWidth <= 768;
    const adjustedBend = isMobile ? 0 : bend;

    const app = new App(containerRef.current, {
      items,
      bend: adjustedBend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });
    
    return () => app.destroy();
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return <div className="w-full h-full" ref={containerRef} />;
}