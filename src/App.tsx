import { useCallback, useRef, useState } from 'react';
import { FastenStitchElement } from '@fastenhealth/fasten-stitch-element-react';

export default function App() {
  const CUSTOMER_PUBLIC_ID = import.meta.env.VITE_CUSTOMER_PUBLIC_ID ?? '';
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventBus = useCallback((message: unknown) => {
    console.debug('[FastenStitchElement onEventBus] message', message);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dialogRef.current?.close();
  };

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
              Please set <code>VITE_CUSTOMER_PUBLIC_ID</code> in your .env file to use this demo.
            </div>
          ) : (
            <button className="connect-button" onClick={openModal}>
              Connect Your Health Records
            </button>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setIsModalOpen(false)}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="modal-header">
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="modal-content">
            {isModalOpen && (
              <FastenStitchElement
                publicId={CUSTOMER_PUBLIC_ID}
                debugModeEnabled
                onEventBus={handleEventBus}
              />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
