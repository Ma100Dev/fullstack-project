import { ReactComponent as DefaultImage } from './house.svg';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const arrayBufferToBase64 = (buffer) => { // Probably not the best way to do this
	let binary = '';
	let bytes = new Uint8Array(buffer);
	let len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};

const RentalImage = ({ rental, imageProps }) => {
	return (
		<Box>
			{rental.image ?
				<img
					src={`data:${rental.image.contentType};base64,${arrayBufferToBase64(rental.image.data.data)}`}
					{...imageProps}
				/> :
				<DefaultImage {...imageProps} />}
		</Box>
	);
};

const rentalPropType = PropTypes.shape({
	image: PropTypes.shape({
		contentType: PropTypes.string.isRequired,
		data: PropTypes.shape({
			data: PropTypes.array.isRequired,
		}).isRequired,
	})
});

RentalImage.propTypes = {
	rental: rentalPropType.isRequired,
	imageProps: PropTypes.object,
};

export default RentalImage;
