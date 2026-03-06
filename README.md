
# Fasten Connect React Web SDK Playground (Beta)

This project demonstrates the Fasten Stitch Element React SDK (`@fastenhealth/fasten-stitch-element-react`) for integrating Fasten Connect into a React web application. **Please note that this SDK is currently in beta and may not reflect the final version.**

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm**

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd react-web-playground
   ```

2. **Build the SDK** (the playground links to the local SDK via `file:../fasten-stitch-element-react`):
   ```bash
   cd ../fasten-stitch-element-react
   npm install
   npm run build
   cd ../react-web-playground
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure the SDK**:
     - Copy `.env.example` to `.env` and set `VITE_CUSTOMER_PUBLIC_ID` with your actual public ID provided by Fasten Connect.

5. **Run the application**:
   ```bash
   npm run dev
   ```

## Notes

- This SDK uses an `<iframe>` to embed Fasten Connect functionality. Auth popups open as native browser windows.
- Debugging is enabled by default in this playground. Disable it in production by removing the `debugModeEnabled` prop.
- The `<iframe>` is rendered inside a modal dialog. Click the "Connect Your Health Records" button to open the modal.

## Known Issues

- The SDK is in beta, and some features may not work as expected.
- Documentation and API stability are subject to change in future releases.

## Feedback

We welcome your feedback! Please report any issues or suggestions via the issue tracker in this repository.

---

**Disclaimer**: This SDK is provided as-is during the beta phase. Use it at your own risk in production environments.
