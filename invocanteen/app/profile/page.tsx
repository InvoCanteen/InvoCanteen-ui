import Navbar from "@/components/navbar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-600">
          Ini adalah profile.
        </p>
      </main>
    </div>
  );
}