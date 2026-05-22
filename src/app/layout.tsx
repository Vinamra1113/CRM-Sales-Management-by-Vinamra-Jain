import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { RoleProvider } from '@/components/role-context';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'CRM & Sales Management | Vinamra Jain™',
  description: 'Enterprise Sales Management and Intelligence Platform by Vinamra Jain™',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-accent/30">
        <FirebaseClientProvider>
          <RoleProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </RoleProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
