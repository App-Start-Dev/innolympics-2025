export function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Alix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
