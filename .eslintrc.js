module.exports = {
    extends: ['next/core-web-vitals', 'eslint:recommended'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn', // Change this to 'off' to disable the rule entirely
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect
      'no-console': 'warn', // Warn on console usage (optional)
      '@next/next/no-img-element': 'off', // Disable warnings for using <img> tags
    },
  };
  