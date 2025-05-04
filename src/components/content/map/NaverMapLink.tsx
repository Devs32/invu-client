// components/content/map/NaverMapLink.tsx
type NaverMapLinkProps = {
  location: string;
  text?: string;
};

export default function NaverMapLink({ location, text = '네이버 지도' }: NaverMapLinkProps) {
  const getNaverMapUrl = () => {
    return `https://map.naver.com/p/search/${encodeURIComponent(location)}`;
  };

  return (
    <a
      href={getNaverMapUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 text-center text-sm text-gray-500"
    >
      {text}
    </a>
  );
}
