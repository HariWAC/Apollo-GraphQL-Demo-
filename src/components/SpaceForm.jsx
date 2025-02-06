
import { useQuery, gql } from '@apollo/client';
import { Play, ArrowRight } from 'lucide-react';

const MEASURE_YOUR_SPACE_QUERY = gql`
  query measureYourSpace {
    MeasureYourSpacePageCms {
      title
      content
      header_html_block
      footer_html_block
      meta_description
      meta_keywords
      meta_title
    }
  }
`;

const SpaceForm = () => {
  const { data, loading, error } = useQuery(MEASURE_YOUR_SPACE_QUERY);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-red-600">
      Error: {error.message}
    </div>
  );

  const contentBlocks = data?.MeasureYourSpacePageCms?.content
    ? JSON.parse(data.MeasureYourSpacePageCms.content)
    : [];

  const renderVideoBlock = (block) => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-semibold text-center mb-8">{block.text_above_the_image}</h2>
      <div className="relative rounded-xl overflow-hidden shadow-xl">
        <video 
          className="w-full h-full object-cover"
          poster={block.images.desktop}
          controls
        >
          <source src={block.video_link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-4 flex items-center gap-2 transition-all">
          <Play className="w-6 h-6" />
          <span className="font-medium">{block.video_button_text}</span>
        </button>
      </div>
    </div>
  );

 
  const renderImageWithParagraph = (block) => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className={`flex flex-col ${block.image_position === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">{block.name_1}</h3>
          <p className="text-gray-600 leading-relaxed">{block.description_1}</p>
          {block.name_2 && (
            <>
              <h3 className="text-2xl font-semibold mt-6 mb-4">{block.name_2}</h3>
              <p className="text-gray-600 leading-relaxed">{block.description_2}</p>
            </>
          )}
        </div>
        <div className="flex-1">
          <img 
            src={block.images.desktop} 
            alt={block.name_1}
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  );

  const renderSvgBlock = (block) => (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50">
      <div className="grid md:grid-cols-4 gap-8">
        {block.content.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="mb-4 h-16 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: item.svg_text }} />
            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-bold text-center mb-12">{data?.MeasureYourSpacePageCms?.title}</h1>
        
        {contentBlocks.map((block, index) => {
          switch (block.block_type) {
            case 'video_with_image_block':
              return <div key={`video-${index}`}>{renderVideoBlock(block)}</div>;
           
            case 'image_with_paragraph':
              return <div key={`image-para-${index}`}>{renderImageWithParagraph(block)}</div>;
            case 'svg_block':
              return <div key={`svg-${index}`}>{renderSvgBlock(block)}</div>;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default SpaceForm;