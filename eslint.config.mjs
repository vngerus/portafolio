import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    rules: {
      // React 19 batches setState automatically; this rule flags valid state-machine patterns.
      'react-hooks/set-state-in-effect': 'off',
      // pinRefs.current[index] passes structural refs to child ref= props — not a stale-read issue.
      'react-hooks/refs': 'off',
    },
  },
];

export default config;
