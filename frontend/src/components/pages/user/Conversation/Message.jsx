import PropTypes from 'prop-types';
import useUser from '../../../../hooks/useUser';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

const Message = ({ message }) => {
    const user = useUser();
    const isSender = user.id === message.sender.id;
    const { createdAt, content } = message;
    return (
        <>
            <Box sx={{
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                'mb': 2,
                backgroundColor: isSender ? 'DodgerBlue' : 'LightGray',
                color: isSender ? 'white' : 'black',
                borderRadius: '10px',
                borderBottomRightRadius: isSender ? '3px' : '10px',
                borderBottomLeftRadius: isSender ? '10px' : '3px',
                padding: '5px',
            }}>
                <Typography variant="body2" color={isSender ? 'Gainsboro' : 'text.secondary'}>{format(new Date(createdAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")}</Typography>
                <Typography>{content}</Typography>
            </Box>
            <svg id="triangle" viewBox="0 0 100 100" style={{
                width: 10,
                transform: isSender ? 'rotate(90deg)' : 'rotate(270deg)',
                position: 'relative',
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                right: isSender ? -9 : 9,
                bottom: 30,
            }}>
                <polygon points="50 15, 100 100, 0 100" fill={isSender ? 'DodgerBlue' : 'LightGray'} />
            </svg>
        </>
    );
};

Message.propTypes = {
    message: PropTypes.object.isRequired
};

export default Message;
