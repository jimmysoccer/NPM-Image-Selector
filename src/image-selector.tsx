import React, { useState } from 'react';
import { AspectRatio } from './components/ui/aspect-ratio';
import { GalleryHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { Dialog } from './components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ImageSelectorProps {
  images: string[];
  index: number;
  title: string;
}

const DefaultMissionImage =
  'https://res.cloudinary.com/ds4h9nepa/image/upload/v1746474294/471ca7ac-e965-4d65-8644-c5067629d0d4_qxcwld.jpg';

const ImageSelector = ({ images, index, title }: ImageSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use default image if no images are provided
  const galleryImages =
    images && images.length > 0 ? images : [DefaultMissionImage];

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') setIsModalOpen(false);
  };

  return (
    <div className='bg-space-dark/50 backdrop-blur-sm rounded-lg p-6 border border-space-accent/20 mb-6'>
      <h2 className='font-orbitron text-xl text-space-accent mb-4 flex items-center'>
        <GalleryHorizontal className='h-5 w-5 mr-2 text-space-accent' />
        任务图库
      </h2>

      <div onClick={() => handleImageClick(index)}>
        <AspectRatio ratio={16 / 9} className='bg-space-dark/30'>
          <img
            src={images[index]}
            alt={`${title} - 图片 ${index + 1}`}
            className='object-cover w-full h-full rounded-md'
            onError={(e) => {
              (e.target as HTMLImageElement).src = DefaultMissionImage;
            }}
          />
        </AspectRatio>
      </div>

      {/* Full screen image modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className='max-w-[90vw] w-full p-0 border-space-accent/30 bg-space-dark/95 backdrop-blur-xl'
          onKeyDown={handleKeyDown}
          aria-description='图片查看器'
        >
          <VisuallyHidden>
            <p className='sr-only'>图片查看器</p>
            <DialogTitle>{`${title} - 图片查看器`}</DialogTitle>
          </VisuallyHidden>
          <div className='relative flex flex-col items-center'>
            {/* Image container */}
            <div className='relative w-full h-[80vh] flex items-center justify-center p-4'>
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${title} - 图片 ${currentImageIndex + 1}`}
                className='max-h-full max-w-full object-contain'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DefaultMissionImage;
                }}
              />

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className='absolute left-4 p-2 rounded-full bg-space-dark/80 backdrop-blur-sm hover:bg-space-dark text-space-light border border-space-accent/30'
              >
                <ArrowLeft className='h-6 w-6' />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className='absolute right-4 p-2 rounded-full bg-space-dark/80 backdrop-blur-sm hover:bg-space-dark text-space-light border border-space-accent/30'
              >
                <ArrowRight className='h-6 w-6' />
              </button>
            </div>

            {/* Image counter */}
            <div className='absolute top-4 left-4 px-3 py-1 rounded-md bg-space-dark/80 backdrop-blur-sm text-space-light'>
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageSelector;
