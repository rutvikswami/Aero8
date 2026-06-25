import './globals.css';
import { DataProvider } from '@/context/DataContext';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';

export const metadata = {
  title: 'AERO8 Robotics | Dream It. Build It. Robotize It.',
  description: 'A student-led robotics startup from Bangalore. Hands-on robotics kits, immersive workshops, and a storybook universe that makes engineering unforgettable.',
  keywords: 'robotics, STEM, education, workshops, Arduino, Mars rover, Bangalore, India, student startup',
  openGraph: {
    title: 'AERO8 Robotics | Dream It. Build It. Robotize It.',
    description: 'A student-led robotics startup from Bangalore building hands-on robotics kits and immersive workshops.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'AERO8 Robotics',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <DataProvider>
          <AuthProvider>
            <AdminProvider>
              {children}
            </AdminProvider>
          </AuthProvider>
        </DataProvider>
      </body>
    </html>
  );
}
