/**
 * Shared GLSL for the GetGeoAgent experience.
 *
 * Every visual state is a function of a uniform that ScrollController drives,
 * so the WebGL layer reverses perfectly when the page is scrolled back up.
 */

/* ------------------------------------------------------------------ */
/* Agent Core — semi-transparent energy shell                          */
/* ------------------------------------------------------------------ */
export const shellVertex = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uDeform;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec3 p = position;
    float wave =
      sin(p.y * 5.0 + uTime * 1.1) * cos(p.x * 4.0 - uTime * 0.8) +
      sin(p.z * 6.0 + uTime * 0.7) * 0.6;
    p += normal * wave * 0.028 * uDeform;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

export const shellFragment = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uGlow;
  uniform float uTime;
  uniform float uEnergy;
  uniform float uNeural;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  void main() {
    vec3 view = normalize(-vView);
    float facing = 1.0 - abs(dot(normalize(vNormal), view));
    float rim = pow(facing, 2.1);

    // Latitude scan lines read as an instrument, not a bauble.
    float scan = sin(vPos.y * 16.0 - uTime * 1.7) * 0.5 + 0.5;
    scan = smoothstep(0.55, 1.0, scan) * 0.34;

    // Neural mode adds a faceted lattice as the agent shifts to GEO.
    vec3 g = abs(fract(vPos * 3.2) - 0.5);
    float lattice = smoothstep(0.46, 0.5, max(max(g.x, g.y), g.z)) * uNeural * 0.5;

    vec3 col = mix(uAccent, uGlow, rim);
    col += uGlow * (scan + lattice) * (0.6 + uEnergy * 0.6);

    float alpha = rim * 0.55 + scan * 0.16 + lattice * 0.3 + 0.02;
    gl_FragColor = vec4(col, alpha * (0.3 + uEnergy * 0.34));
  }
`;

/* ------------------------------------------------------------------ */
/* Core glow billboard                                                 */
/* ------------------------------------------------------------------ */
export const glowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Billboard: strip rotation from the model-view matrix.
    vec3 scale = vec3(
      length(modelViewMatrix[0].xyz),
      length(modelViewMatrix[1].xyz),
      length(modelViewMatrix[2].xyz)
    );
    vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    mv.xy += position.xy * scale.xy;
    gl_Position = projectionMatrix * mv;
  }
`;

export const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float core = smoothstep(1.0, 0.0, d);
    float halo = pow(core, 3.0);
    float alpha = (halo * 0.46 + pow(core, 18.0) * 0.5) * uIntensity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Orbit rings — a travelling pulse marks the agent working             */
/* ------------------------------------------------------------------ */
export const ringVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const ringFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform float uPulses;
  varying vec2 vUv;

  void main() {
    float travel = fract(vUv.x * uPulses - uTime * uSpeed);
    float pulse = pow(1.0 - travel, 14.0);
    float base = 0.22;
    float alpha = (base + pulse * 1.6) * uOpacity;
    vec3 col = uColor + vec3(pulse * 0.7);
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Data particles — one continuous morph across every scene            */
/* ------------------------------------------------------------------ */
export const particleVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aIndex;

  uniform float uTime;
  uniform float uForm;
  uniform float uSize;
  uniform float uSpread;
  uniform float uCollapse;
  uniform vec2 uPointer;

  varying float vSeed;
  varying float vFade;
  varying float vEnergy;

  const float PI = 3.14159265359;

  float hash(float n) { return fract(sin(n * 78.233) * 43758.5453); }

  vec3 hash3(float n) {
    return vec3(hash(n), hash(n + 11.7), hash(n + 27.3));
  }

  /* --- formation 0 : orbital halo (intro) ------------------------- */
  vec3 formHalo(float s, float t) {
    vec3 r = hash3(s * 91.0);
    float radius = 2.1 + r.x * 2.6;
    float theta = r.y * PI * 2.0 + t * (0.06 + r.z * 0.10);
    float phi = acos(1.0 - 2.0 * r.z);
    return vec3(
      radius * sin(phi) * cos(theta),
      radius * cos(phi) * 0.72 + sin(t * 0.4 + s * 6.0) * 0.12,
      radius * sin(phi) * sin(theta)
    );
  }

  /* --- formation 1 : ranked search rows (SEO) --------------------- */
  vec3 formRows(float s, float t) {
    vec3 r = hash3(s * 57.0);
    float row = floor(r.x * 9.0);
    float lane = fract(r.x * 9.0);
    float y = 2.0 - row * 0.52;
    float x = -2.6 + lane * 5.2 + sin(t * 0.5 + row) * 0.06;
    float z = -0.9 + r.y * 1.8;
    return vec3(x, y + sin(t * 0.8 + r.z * 6.0) * 0.02, z);
  }

  /* --- formation 2 : layered neural lattice (GEO) ----------------- */
  vec3 formNeural(float s, float t) {
    vec3 r = hash3(s * 133.0);
    float layer = floor(r.x * 4.0);
    float x = -2.4 + layer * 1.6;
    float ang = r.y * PI * 2.0 + t * 0.12;
    float rad = 0.5 + r.z * 1.5;
    return vec3(
      x + sin(t * 0.6 + r.z * 9.0) * 0.05,
      cos(ang) * rad,
      sin(ang) * rad * 0.85
    );
  }

  /* --- formation 3 : branching topic graph (research) ------------- */
  vec3 formGraph(float s, float t) {
    vec3 r = hash3(s * 211.0);
    float branch = floor(r.x * 6.0);
    float depth = r.y;
    float ang = branch / 6.0 * PI * 2.0 + depth * 0.9 + t * 0.05;
    float rad = 0.35 + depth * 3.4;
    float spread = depth * 0.55;
    return vec3(
      cos(ang) * rad + (r.z - 0.5) * spread,
      (r.z - 0.5) * spread * 1.4 + sin(depth * 6.0) * 0.25,
      sin(ang) * rad + (r.x - 0.5) * spread
    );
  }

  /* --- formation 4 : document lines (content) --------------------- */
  vec3 formDocument(float s, float t) {
    vec3 r = hash3(s * 313.0);
    float col = floor(r.x * 3.0);
    float line = floor(r.y * 14.0);
    float len = 0.35 + hash(line + col * 31.0) * 1.05;
    float u = fract(r.y * 14.0);
    return vec3(
      -3.0 + col * 2.5 + u * len,
      2.2 - line * 0.33,
      -0.4 + r.z * 0.8 + sin(t * 0.5 + line) * 0.02
    );
  }

  /* --- formation 5 : publishing stream ---------------------------- */
  vec3 formStream(float s, float t) {
    vec3 r = hash3(s * 419.0);
    float flow = fract(r.x + t * 0.16);
    float x = -4.2 + flow * 8.4;
    float squeeze = 1.0 - smoothstep(0.35, 0.62, flow) * 0.78;
    float ang = r.y * PI * 2.0 + flow * 5.0;
    float rad = (0.25 + r.z * 1.15) * squeeze;
    return vec3(x, cos(ang) * rad, sin(ang) * rad);
  }

  /* --- formation 6 : performance surface (analytics) -------------- */
  vec3 formChart(float s, float t) {
    vec3 r = hash3(s * 523.0);
    float x = -3.2 + r.x * 6.4;
    float curve = 0.55 * sin(r.x * 3.4) + r.x * 1.9 - 1.0;
    float bar = step(0.72, r.y);
    float y = mix(curve + (r.y - 0.5) * 0.34, -1.6 + r.z * (0.6 + r.x * 2.2), bar);
    return vec3(x, y, -0.6 + r.z * 1.2);
  }

  /* --- formation 7 : continuous improvement loop ------------------ */
  vec3 formLoop(float s, float t) {
    vec3 r = hash3(s * 641.0);
    float ang = r.x * PI * 2.0 + t * 0.35;
    float tube = r.y * PI * 2.0;
    float R = 2.5;
    float rr = 0.28 + r.z * 0.42;
    return vec3(
      (R + rr * cos(tube)) * cos(ang),
      rr * sin(tube) + sin(ang * 3.0) * 0.18,
      (R + rr * cos(tube)) * sin(ang)
    );
  }

  /* --- formation 8 : collapse into the core ----------------------- */
  vec3 formCollapse(float s, float t) {
    vec3 r = hash3(s * 733.0);
    float ang = r.y * PI * 2.0 + t * 0.9;
    float phi = acos(1.0 - 2.0 * r.x);
    float rad = 0.9 + r.z * 0.5;
    return vec3(
      rad * sin(phi) * cos(ang),
      rad * cos(phi),
      rad * sin(phi) * sin(ang)
    );
  }

  vec3 formation(int id, float s, float t) {
    if (id <= 0) return formHalo(s, t);
    if (id == 1) return formRows(s, t);
    if (id == 2) return formNeural(s, t);
    if (id == 3) return formGraph(s, t);
    if (id == 4) return formDocument(s, t);
    if (id == 5) return formStream(s, t);
    if (id == 6) return formChart(s, t);
    if (id == 7) return formLoop(s, t);
    return formCollapse(s, t);
  }

  void main() {
    float s = aSeed;
    float t = uTime;

    float f = clamp(uForm, 0.0, 8.0);
    int a = int(floor(f));
    int b = int(min(floor(f) + 1.0, 8.0));
    float m = smoothstep(0.0, 1.0, fract(f));

    // Stagger the morph per particle so the field reorganises like data
    // moving, not like a single rigid object snapping into place.
    float lead = (hash(s * 17.0) - 0.5) * 0.55;
    float mm = clamp(m * 1.55 + lead, 0.0, 1.0);
    mm = smoothstep(0.0, 1.0, mm);

    vec3 pa = formation(a, s, t);
    vec3 pb = formation(b, s, t);
    vec3 pos = mix(pa, pb, mm);

    // Mid-morph particles arc outward, which reads as travel.
    float arc = sin(mm * 3.14159) * 0.42 * (hash(s * 3.7) - 0.5);
    pos += normalize(pos + 0.0001) * arc;

    pos *= uSpread;
    pos = mix(pos, vec3(0.0), uCollapse);
    pos.x += uPointer.x * 0.16;
    pos.y += -uPointer.y * 0.12;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;
    vFade = smoothstep(26.0, 5.0, dist);
    vSeed = s;
    vEnergy = sin(mm * 3.14159);

    gl_PointSize = uSize * (0.5 + hash(s * 5.1) * 0.9) * (18.0 / max(dist, 0.6));
    gl_Position = projectionMatrix * mv;
  }
`;

export const particleFragment = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uGlow;
  uniform float uOpacity;
  varying float vSeed;
  varying float vFade;
  varying float vEnergy;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uAccent, uGlow, fract(vSeed * 13.0));
    col += vec3(vEnergy * 0.55);
    float alpha = pow(soft, 1.7) * vFade * uOpacity * (0.35 + fract(vSeed * 7.0) * 0.65);
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Connection lines — a signal travels along each link                 */
/* ------------------------------------------------------------------ */
export const linkVertex = /* glsl */ `
  attribute float aPos;
  attribute float aLink;
  varying float vPos;
  varying float vLink;
  void main() {
    vPos = aPos;
    vLink = aLink;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const linkFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;
  varying float vPos;
  varying float vLink;

  void main() {
    float travel = fract(vPos - uTime * 0.55 + vLink * 0.37);
    float signal = pow(1.0 - travel, 10.0);
    float alpha = (0.16 + signal * 1.1) * uOpacity;
    gl_FragColor = vec4(uColor + vec3(signal * 0.6), alpha);
  }
`;
