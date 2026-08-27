import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/** Flat config — eslint-config-next 16 ships flat configs directly. */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  {
    rules: {
      'no-console': ['error', { allow: ['error', 'warn'] }],
    },
  },
  {
    // The WebGL layer lives outside React's render model on purpose: three.js
    // requires per-frame mutation of uniforms, matrices and geometry buffers
    // inside useFrame. Allocating fresh objects each frame would defeat the
    // whole point, so the immutability rule does not apply here.
    files: ['components/experience/three/**', 'components/experience/CameraRig.js'],
    rules: {
      'react-hooks/immutability': 'off',
    },
  },
];

export default eslintConfig;
