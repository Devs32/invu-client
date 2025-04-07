export default function DateText({ dateString }: { dateString: string }) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return (
    <div className="flex flex-row items-center text-3xl text-gray-600 font-bold">
      { year }
      <div className="border border-gray-800 h-6 mx-4"></div>
      { month }
      <div className="border border-gray-800 h-6 mx-4"></div>
      { day }
    </div>
  );
}
