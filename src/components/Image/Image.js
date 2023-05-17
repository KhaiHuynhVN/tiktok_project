import PropTypes from 'prop-types';
import classNames from 'classnames';
import { forwardRef } from 'react';
import images from '~/assets/images';

const Image = forwardRef(
   ({ src = images.defaultImage, className, alt = 'tiktok_image', ...props }, ref) => {
      return (
         <img
            className={classNames('wrapper', className)}
            ref={ref}
            alt={alt}
            {...props}
            src={src}
            onError={(e) => (e.target.src = images.defaultImage)}
         />
      );
   },
);

Image.propTypes = {
   src: PropTypes.string,
   className: PropTypes.string,
   alt: PropTypes.string,
};

export default Image;
