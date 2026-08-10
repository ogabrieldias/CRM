import AuthGuard from "../../components/AuthGuard";

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}