import UrlToVideo from './components/UrlToVideo'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm py-4">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 from-0% via-blue-500 via-50% to-red-500 to-100% animate-gradient bg-[length:300%_auto]">Video Ads Generator</h1>
      </nav>
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <UrlToVideo />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
