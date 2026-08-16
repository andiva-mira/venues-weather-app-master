import eveSource from 'eve/eve.js?raw';
import snapSource from 'snapsvg/dist/snap.svg.js?raw';

// snapsvg's UMD wrapper mishandles bundler-provided CJS/ESM interop (it
// ends up throwing "eve is not defined" once .animate()/.load() run under
// Vite). Executing the untouched vendor source as a classic global script
// runs it exactly as it was authored, with real browser globals.
if (typeof window !== 'undefined' && !window.Snap) {
	// eslint-disable-next-line no-new-func
	new Function(eveSource)();
	// eslint-disable-next-line no-new-func
	new Function(snapSource)();
}

export default window.Snap;
