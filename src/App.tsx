import { useCallback, useRef, useState } from 'react';
import {
  FastenStitchElement,
  ConnectMode,
  type FastenStitchElementHandle,
} from '@fastenhealth/fasten-stitch-element-react';

const CONNECT_MODES = [
  { value: ConnectMode.Popup, label: 'Popup' },
  { value: ConnectMode.Websocket, label: 'Websocket' },
  { value: ConnectMode.Redirect, label: 'Redirect' },
] as const;

export default function App() {
  const CUSTOMER_PUBLIC_ID = import.meta.env.VITE_CUSTOMER_PUBLIC_ID ?? '';
  const stitchRef = useRef<FastenStitchElementHandle>(null);
  const [connectMode, setConnectMode] = useState<ConnectMode>(ConnectMode.Popup);
  const [brandingTheme, setBrandingTheme] = useState('light');
  const [brandingAccentColor, setBrandingAccentColor] = useState('');
  const [brandingLogoUrl, setBrandingLogoUrl] = useState('');
  const [brandingCompanyName, setBrandingCompanyName] = useState('');

  const brandingProps = {
    brandingTheme,
    brandingAccentColor: brandingAccentColor.trim() || undefined,
    brandingLogoUrl: brandingLogoUrl.trim() || undefined,
    brandingCompanyName: brandingCompanyName.trim() || undefined,
  };

  const handleEventBus = useCallback((event: MessageEvent) => {
    console.debug('[FastenStitchElement onEventBus]', event.data);
  }, []);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="app-content">
          <h1 className="app-title">Fasten Connect Demo</h1>
          <p className="app-description">
            Click the button below to open Fasten Connect in a modal window.
          </p>

          {!CUSTOMER_PUBLIC_ID ? (
            <div className="env-warning">
              Please set <code>VITE_CUSTOMER_PUBLIC_ID</code> in your .env file
              to use this demo.
            </div>
          ) : (
            <div className="demo-sections">
              {/* ── Connect mode selector ──────────────────────── */}
              <section className="demo-section">
                <h2 className="demo-section-title">Connect Mode</h2>
                <p className="demo-section-desc">
                  Select how the OAuth flow communicates completion back to the
                  widget.
                </p>
                <div className="mode-switcher">
                  {CONNECT_MODES.map((mode) => (
                    <button
                      key={mode.value}
                      type="button"
                      className={`mode-option${connectMode === mode.value ? ' active' : ''}`}
                      onClick={() => setConnectMode(mode.value)}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                <p className="mode-hint">
                  Active: <code>{connectMode}</code>
                </p>
              </section>

              <section className="demo-section">
                <h2 className="demo-section-title">Co-branding</h2>
                <p className="demo-section-desc">
                  Customize the Fasten Connect header and appearance for all
                  examples below. Leave optional fields empty to use the defaults.
                </p>
                <div className="branding-fields">
                  <label className="branding-field" htmlFor="branding-theme">
                    Theme
                    <select
                      id="branding-theme"
                      value={brandingTheme}
                      onChange={(event) => setBrandingTheme(event.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </label>
                  <label className="branding-field" htmlFor="branding-accent-color">
                    Accent color (optional)
                    <input
                      id="branding-accent-color"
                      type="text"
                      value={brandingAccentColor}
                      onChange={(event) => setBrandingAccentColor(event.target.value)}
                      placeholder="#1A73E8"
                      aria-describedby="branding-accent-hint"
                    />
                  </label>
                  <p id="branding-accent-hint" className="branding-hint">
                    Use #RGB or #RRGGBB. Invalid colors are ignored by the embed.
                  </p>
                  <label className="branding-field" htmlFor="branding-logo-url">
                    Logo URL (optional)
                    <input
                      id="branding-logo-url"
                      type="url"
                      value={brandingLogoUrl}
                      onChange={(event) => setBrandingLogoUrl(event.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                  </label>
                  <label className="branding-field" htmlFor="branding-company-name">
                    Company name (optional)
                    <input
                      id="branding-company-name"
                      type="text"
                      value={brandingCompanyName}
                      onChange={(event) => setBrandingCompanyName(event.target.value)}
                      placeholder="Example Health"
                    />
                  </label>
                </div>
              </section>

              {/* ── Default button ─────────────────────────────── */}
              <section className="demo-section">
                <h2 className="demo-section-title">Default Button</h2>
                <p className="demo-section-desc">
                  Uses the SDK's built-in styled button and dialog.
                </p>
                <FastenStitchElement
                  {...brandingProps}
                  publicId={CUSTOMER_PUBLIC_ID}
                  connectMode={connectMode}
                  onEventBus={handleEventBus}
                />
              </section>

              {/* ── Custom label ───────────────────────────────── */}
              <section className="demo-section">
                <h2 className="demo-section-title">Custom Label</h2>
                <p className="demo-section-desc">
                  Override the default button text via the{' '}
                  <code>buttonLabel</code> prop.
                </p>
                <FastenStitchElement
                  {...brandingProps}
                  publicId={CUSTOMER_PUBLIC_ID}
                  connectMode={connectMode}
                  buttonLabel="Connect Your Health Records"
                  onEventBus={handleEventBus}
                />
              </section>

              {/* ── Custom trigger (children) ──────────────────── */}
              <section className="demo-section">
                <h2 className="demo-section-title">Custom Trigger</h2>
                <p className="demo-section-desc">
                  Pass any element as <code>children</code> to replace the
                  default button.
                </p>
                <FastenStitchElement
                  {...brandingProps}
                  publicId={CUSTOMER_PUBLIC_ID}
                  connectMode={connectMode}
                  onEventBus={handleEventBus}
                >
                  <span className="custom-trigger">
                    Link my records &rarr;
                  </span>
                </FastenStitchElement>
              </section>

              {/* ── Programmatic control via ref ───────────────── */}
              <section className="demo-section">
                <h2 className="demo-section-title">Programmatic Control</h2>
                <p className="demo-section-desc">
                  Use a ref to call <code>show()</code> / <code>hide()</code>{' '}
                  imperatively.
                </p>
                <div className="ref-buttons">
                  <button
                    className="connect-button"
                    onClick={() => stitchRef.current?.show()}
                  >
                    Open via ref
                  </button>
                  <button
                    className="connect-button secondary"
                    onClick={() => stitchRef.current?.hide()}
                  >
                    Close via ref
                  </button>
                </div>
                {/* Hidden trigger — controlled entirely via ref */}
                <FastenStitchElement
                  {...brandingProps}
                  ref={stitchRef}
                  publicId={CUSTOMER_PUBLIC_ID}
                  connectMode={connectMode}
                  onEventBus={handleEventBus}
                  buttonStyle={{ display: 'none' }}
                />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
