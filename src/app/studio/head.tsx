export default function Head() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const originalError = console.error;
  console.error = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    if (message.includes('disableTransition')) return;
    originalError(...args);
  };
})();
`,
        }}
      />
    </>
  );
}
