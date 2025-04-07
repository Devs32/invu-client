import TitleText from '@/components/fragments/text/TitleText';
import { twMerge } from 'tailwind-merge';
import Wrapper from '../Wrapper';
import Map from './Map';

const routeMapWrapperClass = twMerge(

);

const routeMapDescriptionWrapperClass = twMerge(
  'flex flex-col gap-4',
  'text-left',
  'w-full',
  'p-10'
);

type RouteMapProps = {
  data: {
    title: string;
    content: {
      mapTitle: string;
      location: string;
      routeDescription: {
        title: string;
        description: string;
      }[];
    }
  }
};

export default function RouteMap({ data }: RouteMapProps) {
  return (
    <Wrapper className={ routeMapWrapperClass }>
      <TitleText text={ data.title } />
      <Map location={ data.content.location } />
      <div className={ routeMapDescriptionWrapperClass }>
        <div>
          <div>주소</div>
          <div>{ data.content.location }</div>
        </div>
        {
          data.content.routeDescription.map((routeDescription) => (
            <div key={ routeDescription.title }>
              <h3>{ routeDescription.title }</h3>
              <p>{ routeDescription.description }</p>
            </div>
          ))
        }
      </div>
    </Wrapper>
  );
}
