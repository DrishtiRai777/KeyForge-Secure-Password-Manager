const About = () => {
  return (
    <>
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>

      {/* Glowing blobs effect */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-30"></div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>

      {/* Your content */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl font-bold">Welcome to KeyForge</h1>
        <p className="mt-2 text-lg">Unlock Security, Forge Trust.</p>
      </div>
    </div>

    </>
  )
}

export default About
