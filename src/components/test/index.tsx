export default function Test() {
  return (
    <div className="bg-red-500 h-[100vh]">
      <h1 className="text-white">Class Room</h1>
      <div className="flex flex-col md:flex-row w-full">
        <div className="h-40 bg-blue-500 w-full md:w-1/2"></div>
        <div className="h-40 bg-yellow-500 w-full md:w-1/2"></div>
      </div>
    </div>
  );
}
